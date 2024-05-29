import { Component, OnInit } from '@angular/core';
  import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
  import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
  import { ReportService } from '../../../../../shared/services/report.service';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { response } from 'express';
  import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { AiComponent } from "../../../../../shared/ai/ai.component";

  @Component({
    selector: 'app-report',
    standalone: true,
    templateUrl: './reportlist.component.html',
    styleUrl: './reportlist.component.css',
    imports: [RouterModule, NavigationComponent, FormsModule, CommonModule, AiComponent]
})
  export class ReportlistComponent implements OnInit {
    reports: any[] = [];
    old_state: any[] = [];
    workspaceId = '';
    reportTypes: any[] = [];
    report_filter = ""
    constructor(
      private reportService: ReportService,
      private route: Router,
      private aRoute: ActivatedRoute,
      private annualReportService: AnnualreportService
    ) {
    }

    ngOnInit(): void {
      this.aRoute.paramMap.subscribe((params: Params) => {
        this.workspaceId = params['params']['workspace_id'];
        this.fetchReports();
        this.fetchReportTypes();
      });
    }

    fetchReports(): void {
      this.reportService.getReports(this.workspaceId).subscribe(
        (response) => {
          this.reports = response.data.report;
          this.old_state = this.reports
        },
        (error) => {
          console.log(error);
        }
      );
    }

    fetchReportTypes(): void {
      this.reportService.getReportType().subscribe(
        (response) => {
          this.reportTypes = response.data.reportType;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    getReportTypeName(reportTypeId: number): string {
      const reportType = this.reportTypes.find(
        (type) => type.report_type_id === reportTypeId
      );
      return reportType ? reportType.name : '';
    }

    openReport(reportId: any, reportTypeId: number): void {
      if (reportTypeId === 1) {
        this.route.navigate([`../reportview/${reportId}`], {
          relativeTo: this.aRoute,
        });
      } else if (reportTypeId === 2) {
        this.route.navigate([`../viewaccomplishmentreport/${reportId}`], {
          relativeTo: this.aRoute,
        });
      } else {
        // Handle other report types if needed
      }
    }

    searchReport() {
      this.reports = this.old_state;
      this.reports = this.reports.filter(report => {
        return report.title.includes(this.report_filter); 
      });
    }

    navigateToCreateReport(): void {
      this.route.navigate([`../createreport`], {
        relativeTo: this.aRoute,
      });
    }

    navigateToEditReport(reportId: any): void {
      this.route.navigate([`../editreport/${reportId}`], {
        relativeTo: this.aRoute,
      });
    }

    navigateToDeleteReport(reportId: any): void {
      this.route.navigate([`../deletereport/${reportId}`], {
        relativeTo: this.aRoute,
      });
    }
  }
