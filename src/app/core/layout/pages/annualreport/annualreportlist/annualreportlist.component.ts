import { ChangeDetectorRef, Component } from '@angular/core';
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
import { AnnualContentService } from '../../../../../shared/services/annualcontent.service';

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
    annualReport: any[] = [];
    old_annualReport: any[] = [];
    annualContents: any[] = [];  // Store all annual contents here
    annualReport_filter = "";
    annualContent: any = {
        annual_report_id: 0,
        annual_body: ''
    };

    constructor(
        private route: Router,
        private aRoute: ActivatedRoute,
        private reportSelect: ReportselectionService,
        private annualReportService: AnnualreportService,
        private annualContentService: AnnualContentService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.aRoute.paramMap.subscribe((params: Params) => {
            this.workspaceId = params['params']['workspace_id'];
            this.fetchAnnualReports();
            this.fetchReportSelection();
            this.fetchAnnualContents(); 
            this.cdr.detectChanges();
        });
    }

    fetchAnnualReports() {
        this.annualReportService.getAnnualReports(this.workspaceId).subscribe(
            (response) => {
                this.annualReport = response.data.reports;
                this.old_annualReport = this.annualReport;
                this.cdr.detectChanges();
            },
            (error) => {
                console.log('Error fetching annual reports:', error);
            }
        );
    }

    fetchAnnualContents(): void {
        this.annualContentService.getAnnualContents().subscribe(
            (response) => {
                this.annualContents = response.data.annual_content;  // Store fetched contents here
            },
            (error) => {
                console.log('Error fetching annual content:', error);
            }
        );
    }

    fetchReportSelection(): void {
        this.reportSelect.getReportSelections().subscribe(
            (response) => {
                if (response && response.data && Array.isArray(response.data.reportSelections)) {
                    this.reportSelections = response.data.reportSelections;
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
        this.annualReport = this.old_annualReport.filter(annualReport => {
            return annualReport.annualreport_title.includes(this.annualReport_filter);
        });
    }

    openAnnualReport(annualReportId: any) {
        const matchingContent = this.annualContents.find(content => content.annual_report_id === annualReportId);
        if (matchingContent) {
            this.route.navigate([`../annualreport/${annualReportId}/annual_content/${matchingContent.annual_content_id}`], { relativeTo: this.aRoute });
        } else {
            console.log('No matching annual content found for the given annual report ID.');
        }
    }

    navigateToCreateAnnualReport() {
        this.route.navigate([`../createannualreport`], { relativeTo: this.aRoute });
    }

    navigateToDeleteAnnualReport(annualReportId: any) {
        this.route.navigate([`../deleteannualreport/${annualReportId}`], { relativeTo: this.aRoute });
    }

    navigateToEditAnnualReport(annualReportId: any) {
        this.route.navigate([`../editannualreport/${annualReportId}`], { relativeTo: this.aRoute });
    }
}