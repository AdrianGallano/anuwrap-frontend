import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { forkJoin } from 'rxjs';

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
    title: '',
    description: '',
    workspace_id: 0,
    report_id: 0
  };

  reportSelection: any[] = [];
  reports: any[] = [];
  accomplishmentReports: any[] = [];
  reportTypes: any[] = [];
  accomplishmentReportTypeId: number | undefined;

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
          return report && report.report_type_id === 2;
        });

        // Manually trigger change detection after data update
        this.cdr.detectChanges();

        // Fetch accomplishment reports for filtered report_ids
        const reportIds = this.reportSelection.map(selection => selection.report_id);
        this.fetchAccomplishmentReports(reportIds);
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
  
        // Filter reports by report_type_id equal to 2
        this.reports = allReports.filter((report: any) => report.report_id);
  
        // Manually trigger change detection after data update
        this.cdr.detectChanges();
  
        // Assign the report_id of the first report to annualReport.report_id
        if (this.reports.length > 0) {
          this.annualReport.report_id = this.reports[0].report_id;
        }
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }
  
  fetchAccomplishmentReports(reportIds: number[]): void {
    if (reportIds.length === 0) {
      return; // No valid report_ids, do not proceed
    }

    const requests = reportIds.map(reportId => {
      return this.accomplishmentReportService.getAccomplishmentReports(reportId);
    });

    forkJoin(requests).subscribe(
      (responses) => {
        this.accomplishmentReports = responses.map(response => response.data.accomplishmentReports);
        console.log('Accomplishment Reports:', this.accomplishmentReports);

        // Manually trigger change detection after data update
        this.cdr.detectChanges();
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
    this.route.navigate(['../../createreportselection-accomplishment', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }

  navigateToAnnualreportItem(): void {
    this.route.navigate(['../../annualreportitem', this.annualReport.annual_report_id], { relativeTo: this.aRoute });
  }
}
