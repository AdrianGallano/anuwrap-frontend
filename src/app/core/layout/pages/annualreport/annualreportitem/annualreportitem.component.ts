import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { NavigationBarComponent } from "../../../../../shared/navigation-bar/navigation-bar.component";


@Component({
    selector: 'app-viewannualreport',
    standalone: true,
    templateUrl: './annualreportitem.component.html',
    styleUrl: './annualreportitem.component.css',
    imports: [CommonModule, NavigationBarComponent]
})
export class AnnualreportitemComponent {
  annualReport = {
    annual_report_id: 0,
    title: '',
    description: '',
    workspace_id: 0
  };

  reportSelection: any[] = [];
  reports: any[] = [];
  facultyMatrices: any[] = []; // Initialize facultyMatrices array

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportSelect: ReportselectionService,
    private reportService: ReportService,
    private facultyMatrixService: FacultymatrixService, // Inject FacultyMatrixService
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params['params']['workspace_id'];
      this.annualReport.annual_report_id = params['params']['annual_report_id'];
      this.fetchData();
    });
  }

  fetchData(): void {
    // Fetch annual report
    this.annualReportService.getAnnualReport(this.annualReport.annual_report_id).subscribe(
      (response) => {
        const fetchedAnnualReport = response.data.report;
        this.annualReport.title = fetchedAnnualReport.title;
        this.annualReport.description = fetchedAnnualReport.description;
        this.fetchReportSelection();
        this.fetchReports();
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  fetchReports(): void {
    // Fetch reports
    this.reportService.getReports(this.annualReport.workspace_id).subscribe(
      (response) => {
        const allReports = response.data.report || [];

        // Filter reports by report_type_id equal to 1
        this.reports = allReports.filter((report: any) => report.report_type_id === 1);

        // Manually trigger change detection after data update
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }

  fetchReportSelection(): void {
    // Fetch report selections
    this.reportSelect.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections;
        this.reportSelection = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === Number(this.annualReport.annual_report_id);
        });

        console.log('Fetched Report Selections:', this.reportSelection);

        // Fetch faculty matrices for each report_id in reportSelection
        this.reportSelection.forEach((selection) => {
          this.fetchFacultyMatrices(selection.report_id);
        });

        // Fetch and render reports info for each report in reportSelection
        this.reportSelection.forEach((selection) => {
          this.fetchReportInfo(selection.report_id);
        });

        // Manually trigger change detection after data update
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Error fetching report selection:', error);
      }
    );
  }

  fetchFacultyMatrices(reportId: number): void {
    // Fetch faculty matrices for a specific report_id
    this.facultyMatrixService.getFacultyMatrices(reportId).subscribe(
      (response) => {
        const facultyMatrices = response.data.facultyMatrix;
        console.log('All Faculty Matrices:', facultyMatrices);

        // Filter faculty matrices by report_id that matches the given reportId
        const filteredMatrices = facultyMatrices.filter((matrix: any) => {
          return matrix.report_id === reportId;
        });

        // Append filtered matrices to the facultyMatrices array
        this.facultyMatrices.push(...filteredMatrices);

        console.log('Filtered Faculty Matrices:', this.facultyMatrices);
      },
      (error) => {
        console.log('Error fetching faculty matrices:', error);
      }
    );
  }

  fetchReportInfo(reportId: number): void {
    // Fetch report info by reportId
    this.reportService.getReport(reportId).subscribe(
      (response) => {
        const reportInfo = response.data.report;
        // Update the reportSelection array with report info (title and date_created)
        const selectedReport = this.reportSelection.find((selection) => selection.report_id === reportId);
        if (selectedReport) {
          selectedReport.report_title = reportInfo.title;
          selectedReport.date_created = reportInfo.date_created;
        }
      },
      (error) => {
        console.log(`Error fetching report info for report ${reportId}:`, error);
      }
    );
  }
  
  getReportTitle(reportId: number): string {
    const matchingSelection = this.reportSelection.find((selection) => selection.report_id === reportId);
    return matchingSelection ? matchingSelection.report_title : '';
  }
  
  getFacultyMatrices(reportId: number): any[] {
    return this.facultyMatrices.filter((faculty) => faculty.report_id === reportId);
  }
  
  navigateToViewAnnualreport(): void {
    this.route.navigate([`../../viewannualreport-facultymatrix/${this.annualReport.annual_report_id}`], { relativeTo: this.aRoute });
  }

}
