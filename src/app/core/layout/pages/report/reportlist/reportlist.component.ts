import { Component, OnInit } from '@angular/core';
  import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
  import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
  import { ReportService } from '../../../../../shared/services/report.service';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { response } from 'express';
  import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { AiComponent } from "../../../../../shared/ai/ai.component";
import { ContentService } from '../../../../../shared/services/content.service';
import { error } from 'console';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';

  @Component({
    selector: 'app-report',
    standalone: true,
    templateUrl: './reportlist.component.html',
    styleUrl: './reportlist.component.css',
    imports: [RouterModule, NavigationComponent, FormsModule, CommonModule, AiComponent]
})
  export class ReportlistComponent implements OnInit {
    workspaces: any[] = [];
    reports: any[] = [];
    old_state: any[] = [];
    workspaceId = '';
    reportTypes: any[] = [];
    report_filter = "";
    constructor(
      private reportService: ReportService,
      private route: Router,
      private aRoute: ActivatedRoute,
      private annualReportService: AnnualreportService,
      private contentService: ContentService,
      private userWorkspaceService: UserworkspaceService
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

    openReport(reportId: any, contentId: any): void {
        this.route.navigate([`../report/${reportId}/content/${contentId}`], {
          relativeTo: this.aRoute,
        });
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
