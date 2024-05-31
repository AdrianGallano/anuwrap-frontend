import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { forkJoin, map } from 'rxjs';
import { ContentService } from '../../../../../shared/services/content.service';

interface Report {
  report_id: number;
  content_id: number;
}

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
  contentId=0
  content: { report_id: number; body: string; }[] = [];

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportSelect: ReportselectionService,
    private reportService: ReportService,
    private facultyMatrixService: FacultymatrixService,
    private accomplishmentReportService: AccomplishmentreportService,
    private cdr: ChangeDetectorRef,
    private contentservice: ContentService

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
          return selection.annual_report_id === this.annualReportId 
        });

  
        if (this.reportSelections.length === 0) {
          console.warn('No matching report selections found for the current annual report.');
        }
        
        // Call fetchContents for each reportSelection that needs content fetching
        this.reportSelections.forEach((selection) => {
          this.fetchContents(selection.report_id);
        });
      },
      (error) => {
        console.error('Error fetching report selections:', error);
      }
    );
  }
  

  fetchContents(contentId: number): void {
    // Fetch the reports first
    this.reportService.getReports(this.annualReport.workspace_id).subscribe(
      (response) => {
        const reports: Report[] = response.data.report; // Specify the type as Report[]
        // Find the report with the matching content_id
        const matchingReport = reports.find((report: Report) => report.content_id === contentId); // Specify the type as Report
        if (matchingReport) {
          // Fetch the content using the content_id of the matching report
          this.contentservice.getContent(matchingReport.content_id).subscribe(
            (contentResponse) => {
              // Handle the fetched content here
              const content = contentResponse.data.content;
              // Push the fetched content to the content array
              this.content.push({ report_id: content.report_id, body: content.body });
            },
            (contentError) => {
              console.log('Error fetching content:', contentError);
            }
          );
        } else {
          console.warn('No matching report found for the specified content_id:', contentId);
        }
      },
      (error) => {
        console.log('Error fetching reports:', error);
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