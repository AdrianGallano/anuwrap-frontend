import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, map } from 'rxjs';
import { AnnualreportService } from '../../../../../../shared/services/annualreport.service';
import { ReportselectionService } from '../../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../../shared/services/facultymatrix.service';
import { AccomplishmentreportService } from '../../../../../../shared/services/accomplishmentreport.service';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from "../../../../../../shared/navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-annualreportitem-accomplishmentreport',
    standalone: true,
    templateUrl: './annualreportitem-accomplishmentreport.component.html',
    styleUrl: './annualreportitem-accomplishmentreport.component.css',
    imports: [CommonModule, FormsModule, NavigationBarComponent]
})
export class AnnualreportitemAccomplishmentreportComponent {
  annualReport = {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0,
    date_created: 0
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
        this.annualReport.date_created = fetchedAnnualReport.date_created;
        this.annualReport.description = fetchedAnnualReport.description;
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
  
        // Filter report selections by matching annual_report_id and report_type_id
        this.reportSelections = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === this.annualReportId && 
                 selection.report_type_id === 2;
        });
  
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

  navigateToViewAnnualReport(): void {
    this.route.navigate([`../../viewannualreport-accomplishmentreport/${this.annualReport.annual_report_id}`], { relativeTo: this.aRoute });
  }

}