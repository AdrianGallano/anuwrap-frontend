import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-viewannualreport-accomplishmentreport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewannualreport-accomplishmentreport.component.html',
  styleUrls: ['./viewannualreport-accomplishmentreport.component.css']
})
export class ViewannualreportAccomplishmentreportComponent implements OnInit {
  annualReport = {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0
  };
  reportSelections: any[] = [];
  accomplishmentReports: any[] = [];
  annualReportId: number|undefined;

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportSelect: ReportselectionService,
    private reportService: ReportService,
    private facultyMatrixService: FacultymatrixService,
    private accomplishmentReportService: AccomplishmentreportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
                 selection.report_type_id === 2;
        });
  
        console.log('Filtered Report Selections:', this.reportSelections);
  
        if (this.reportSelections.length === 0) {
          console.warn('No matching report selections found for the current annual report.');
        }
  
        this.reportSelections.forEach((selection) => {
          // Fetch faculty matrices only for report IDs associated with the annual report
          this.fetchAccomplishmentReports(selection.report_id);
        });
      },
      (error) => {
        console.error('Error fetching report selections:', error);
      }
    );
  }

  fetchAccomplishmentReports(reportId: number): void {
    this.accomplishmentReportService.getAccomplishmentReports(reportId).subscribe(
      (response) => {
        const accomplishmentReport = response.data.accomplishmentReports;
        this.accomplishmentReports.push(accomplishmentReport); // Store fetched report in array
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching accomplishment reports:', error);
      }
    );
  }

  navigateToAnnualReportList(): void {
    this.route.navigate(['../../annualreportlist'], { relativeTo: this.aRoute });
  }

  navigateToCreateReportSelection(): void {
    this.route.navigate(['../../createreportselection', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

  navigateToExport(): void {
    this.route.navigate(['../../annualreportitem-accomplishmentreport', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

}