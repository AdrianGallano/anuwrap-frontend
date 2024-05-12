import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';


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
    title: '',
    description: '',
    workspace_id: 0
  };

  reportSelection: any[] = [];
  reports: any[] = [];
  facultyMatrices: any[] = []; 
  
  reportTypes: any[] = [];
  facultyMatrixReportTypeId: number | undefined;

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportSelect: ReportselectionService,
    private reportService: ReportService,
    private facultyMatrixService: FacultymatrixService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params['params']['workspace_id'];
      this.annualReport.annual_report_id = params['params']['annual_report_id'];
      this.fetchData(); // Fetch data initially
    });
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Re-fetch data when navigation ends (e.g., coming back from export or refresh)
        this.fetchData();
      }
    });
  }
  
  fetchData(): void {
    if (this.annualReport.annual_report_id === 0) {
      return; // No valid annual_report_id, do not proceed
    }

    this.annualReportService.getAnnualReport(this.annualReport.annual_report_id).subscribe(
      (response) => {
        const fetchedAnnualReport = response.data.report;
        this.annualReport.title = fetchedAnnualReport.title;
        this.annualReport.description = fetchedAnnualReport.description;

        this.fetchReportSelection();
        this.fetchReports();
      },
      (error) => {
        console.log('Error fetching annual report:', error);
      }
    );
  }

  fetchReportSelection(): void {
    if (this.annualReport.annual_report_id === 0) {
      return; // No valid annual_report_id, do not proceed
    }

    this.reportSelect.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections || [];

        // Filter report selections by report_id with reportTypeId equal to 1
        this.reportSelection = reportSelections.filter((selection: any) => {
          const report = this.reports.find((report) => report.report_id === selection.report_id);
          return report && report.report_type_id === 1;
        });

        // Manually trigger change detection after data update
        this.cdr.detectChanges();

        // Fetch faculty matrices for each report_id in reportSelection
        this.reportSelection.forEach((selection) => {
          this.fetchFacultyMatrices(selection.report_id);
        });
      },
      (error) => {
        console.log('Error fetching report selections:', error);
      }
    );
  }

  fetchReports(): void {
    if (this.annualReport.workspace_id === 0) {
      return; // No valid workspace_id, do not proceed
    }

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

  fetchReportTypes(): void {
    this.reportService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data.reportType;
        this.facultyMatrixReportTypeId = this.findReportTypeId('Faculty Matrix');
        console.log(this.facultyMatrixReportTypeId)
      },
      (error) => {
        console.log('Error fetching report types:', error);
      }
    );
  }

  findReportTypeId(reportName: string): number | undefined {
    const reportType = this.reportTypes.find(type => type.name === reportName);
    return reportType ? reportType.report_type_id : undefined;
  }

  fetchFacultyMatrices(reportId: number): void {
    if (reportId === 0) {
      return; // Invalid reportId, do not proceed
    }

    this.facultyMatrixService.getFacultyMatrices(reportId).subscribe(
      (response) => {
        const facultyMatrices = response.data.facultyMatrix || [];

        // Filter faculty matrices by report_id that matches the given reportId
        const filteredMatrices = facultyMatrices.filter((matrix: any) => matrix.report_id === reportId);

        // Append filtered matrices to the facultyMatrices array
        this.facultyMatrices.push(...filteredMatrices);

        // Manually trigger change detection after data update
        this.cdr.detectChanges();
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
  
  navigateToAnnualReportList(): void {
    this.route.navigate(['../../annualreportlist'], { relativeTo: this.aRoute });
  }

  navigateToCreateReportSelection(): void {
    this.route.navigate(['../../createreportselection', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

  navigateToAnnualreportItem(): void {
    this.route.navigate(['../../annualreportitem', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }
}
