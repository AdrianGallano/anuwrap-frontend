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
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-annualreportlist',
    standalone: true,
    templateUrl: './annualreportlist.component.html',
    styleUrl: './annualreportlist.component.css',
    imports: [NavigationComponent, FormsModule, CommonModule, RouterModule, AiComponent]
})
export class AnnualreportlistComponent {
    workspaceId: any;
    annualReportId: any;
    reportSelections: any[] = [];
    annualReport: any[]=[];
    old_annualReport: any[]= [];
    annualReport_filter = "";

    constructor(
        private route: Router,
        private aRoute: ActivatedRoute,
        private reportSelect: ReportselectionService,
        private annualReportService: AnnualreportService
    ) {}

    ngOnInit(): void {
        this.aRoute.paramMap.subscribe((params: Params) => {
            this.workspaceId = params["params"]["workspace_id"];
            this.fetchAnnualReports();
            this.fetchReportSelection();
        });
    }

    fetchAnnualReports() {
        this.annualReportService.getAnnualReports(this.workspaceId).subscribe(
            (response) => {
                this.annualReport = response.data.reports;
                this.old_annualReport = this.annualReport
            },
            (error) => {
                console.log('Error fetching annual reports:', error);
            }
        );
    }

    fetchReportSelection(): void {
        this.reportSelect.getReportSelections().subscribe(
            (response) => {
                if (response && response.data && Array.isArray(response.data.reportSelections)) {
                    this.reportSelections = response.data.reportSelections;

                    // After fetching reportSelections, you can directly handle navigation
                    // based on the data retrieved
                } else {
                    console.log('Invalid or empty response for fetchReportSelection');
                }
            },
            (error) => {
                console.log('Error fetching report selections:', error);
            }
        );
    }

    searchReport() {
      this.annualReport = this.old_annualReport;
      this.annualReport = this.old_annualReport.filter(annualReport => {
        return annualReport.annualreport_title.includes(this.annualReport_filter); 
      });
      console.log(this.annualReport_filter);
    }


    openAnnualReport(annualReportId: any) {
        this.route.navigate([`../annualcontent/${annualReportId}`], { relativeTo: this.aRoute });
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