import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { response } from 'express';
import { error } from 'console';
import { NavigationComponent } from "../../../../../shared/navigation/navigation.component";
import { title } from 'process';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../../shared/services/report.service';

@Component({
    selector: 'app-annualreportlist',
    standalone: true,
    templateUrl: './annualreportlist.component.html',
    styleUrl: './annualreportlist.component.css',
    imports: [NavigationComponent, FormsModule, CommonModule, RouterModule]
})
export class AnnualreportlistComponent {
workspaceId: any;
annualReportId: any;
annualReport: any[] = [];
reports: any[]=[];

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
      console.log(this.workspaceId)
    });
    this.fetchAnnualReports();
    this.fetchReports();
  }

  fetchAnnualReports() {
    this.annualReportService.getAnnualReports(this.workspaceId).subscribe(
        (response) => {
            this.annualReport = response.data.reports;
            console.log('Fetched Annual Reports:', this.annualReport);
        },
        (error) => {
            console.log('Error fetching annual reports:', error);
        }
    );
}

fetchReports() {
    this.reportService.getReports(this.workspaceId).subscribe(
        (response) => {
            if (response && response.data && Array.isArray(response.data.report)) {
                this.reports = response.data.report;
                console.log('Fetched Reports:', this.reports);

                // Now you have both annualReport and reports fetched
            } else {
                console.log('Invalid or empty response for fetchReports');
            }
        },
        (error) => {
            console.log('Error fetching reports:', error);
        }
    );
}

openAnnualReport(annualReportId: any) {
    console.log('Selected Annual Report ID:', annualReportId);

    // Find the selected annual report from annualReport array
    const selectedAnnualReport = this.annualReport.find(report => report.annual_report_id === annualReportId);

    if (selectedAnnualReport) {
        // Find the associated report from reports array based on annual_report_id
        const matchedReport = this.reports.find(report => report.report_id === annualReportId);

        if (matchedReport) {
            const reportTypeId = matchedReport.report_type_id;

            if (typeof reportTypeId !== 'undefined') {
                if (reportTypeId === 1) {
                    // Navigate to faculty matrix view
                    this.route.navigate([`../viewannualreport-facultymatrix/${annualReportId}`], { relativeTo: this.aRoute });
                } else if (reportTypeId === 2) {
                    // Navigate to accomplishment report view
                    this.route.navigate([`../viewannualreport-accomplishmentreport/${annualReportId}`], { relativeTo: this.aRoute });
                } else {
                    console.log(`Unknown report type: ${reportTypeId}`);
                }
            } else {
                console.log('Report type ID is undefined');
            }
        } else {
            console.log(`No report found for Annual Report ID: ${annualReportId}`);
        }
    } else {
        console.log(`Annual report with ID ${annualReportId} not found in annualReport`);
    }
}

navigateToCreateAnnualReport() {
    this.route.navigate([`../createannualreport/${this.workspaceId}`], { relativeTo: this.aRoute });
}

navigateToDeleteAnnualReport(annualReportId: any) {
    this.route.navigate([`../deleteannualreport/${annualReportId}`], { relativeTo: this.aRoute });
}

navigateToEditAnnualReport(annualReportId: any) {
  this.route.navigate([`../editannualreport/${annualReportId}`], { relativeTo: this.aRoute });
}
}