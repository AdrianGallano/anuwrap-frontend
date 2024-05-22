import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { response } from 'express';

@Component({
  selector: 'app-viewannualreport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewannualreport.component.html',
  styleUrl: './viewannualreport.component.css'
})
export class ViewannualreportComponent {
  annualReport = {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0
  };

  annualReportId: number|undefined;
  
  reportSelections: any[] = [];
  facultyMatrices: any[] = [];
  filteredReportSelections: any[]=[];

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportSelect: ReportselectionService,
    private facultyMatrixService: FacultymatrixService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params['params']['workspace_id'];
      this.annualReport.annual_report_id = params['params']['annual_report_id'];
      if (this.annualReport.annual_report_id) {
        this.fetchData(); // Call fetchData if annual_report_id is valid
      }
    });
  
    // Subscribe to route events (navigation)
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchData(); // Call fetchData when navigation ends
      }
    });
  }
  

  fetchData(): void {
    this.annualReportService.getAnnualReport(this.annualReport.annual_report_id).subscribe(
      (response) => {
        const fetchedAnnualReport = response.data.report;
        this.annualReportId = fetchedAnnualReport.annual_report_id;
        this.annualReport.annualreport_title = fetchedAnnualReport.annualreport_title;
        this.annualReport.description = fetchedAnnualReport.description;
        console.log(fetchedAnnualReport)
        this.fetchReportSelection();
      },
      (error) => {
        console.log('Error fetching annual report:', error);
      }
    );
  }

  fetchReportSelection(): void {
    this.reportSelect.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections || [];
        console.log('Raw Report Selections:', reportSelections);
        console.log('Current annual_report_id:', this.annualReport.annual_report_id);
  
        // Filter report selections by matching annual_report_id and report_type_id
        this.reportSelections = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === this.annualReportId && 
                 selection.report_type_id === 1;
        });
  
        console.log('Filtered Report Selections:', this.reportSelections);
  
        if (this.reportSelections.length === 0) {
          console.warn('No matching report selections found for the current annual report.');
        }
  
        this.reportSelections.forEach((selection) => {
          // Fetch faculty matrices only for report IDs associated with the annual report
          this.fetchFacultyMatrices(selection.report_id);
        });
      },
      (error) => {
        console.error('Error fetching report selections:', error);
      }
    );
  }
  
  fetchFacultyMatrices(reportId: number): void {
    console.log('Fetching faculty matrices for Report ID:', reportId);
    
    if (this.facultyMatrices.some(matrix => matrix.report_id === reportId)) {
      console.log('Faculty matrices for Report ID', reportId, 'already fetched');
      return;
    }
    
    if (reportId === 0) {
      console.log('Invalid reportId:', reportId);
      return;
    }
    
    this.facultyMatrixService.getFacultyMatrices(reportId).subscribe(
      (response) => {
        const facultyMatrices = response.data.facultyMatrix || [];
        // Filter matrices to include only those with the specific report_id
        const filteredMatrices = facultyMatrices.filter((matrix: any) => matrix.report_id === reportId);
        
        if (filteredMatrices.length > 0) {
          // Store the fetched matrices for the specific report_id
          this.facultyMatrices.push(...filteredMatrices);
          
          console.log('Faculty Matrices for Report ID', reportId, ':', filteredMatrices);
          
          // Manually trigger change detection after data update
          this.cdr.detectChanges();
        } else {
          console.log('No faculty matrices found for Report ID', reportId);
        }
      },
      (error) => {
        console.error('Error fetching faculty matrices for Report ID', reportId, ':', error);
      }
    );
  }
  

  getFacultyMatrices(reportId: number): any[] {
    return this.facultyMatrices.filter((faculty) => faculty.report_id === reportId);
  }

  navigateToCreateReportSelection(): void {
    this.route.navigate(['../../createreportselection', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

  navigateToExport(): void {
    this.route.navigate(['../../annualreportitem-facultymatrix', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

  navigateToAnnualReportList(): void {
    this.route.navigate(['../../annualreportlist'], { relativeTo: this.aRoute });
  }
}
