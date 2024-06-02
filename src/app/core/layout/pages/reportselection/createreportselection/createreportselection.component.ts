import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../../shared/services/report.service';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { AnnualContentService } from '../../../../../shared/services/annualcontent.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-editreportselection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createreportselection.component.html',
  styleUrl: './createreportselection.component.css'
})
export class CreatereportselectionComponent {
  workspaceId: any;
  reports: any[] = [];
  annual_report_id: number | undefined;
  error = '';
  selectAllChecked = false;
  reportSelections: any[] = [];
  newReportSelections: any[] = [];
  annualContent: any = {
    annual_content_id: 0,
    annual_report_id: 0,
    annual_body: 'eto ay malupet'
  }
  annualContentArray: any = []

  constructor(
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService,
    private reportSelectionService: ReportselectionService,
    private annualContentService: AnnualContentService,
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params['params']['workspace_id'];
      this.annual_report_id = +params['params']['annual_report_id'];
      this.annualContent.annual_report_id = this.annual_report_id;
      this.fetchData();
      this.fetchReportSelection();
    });
  }

  fetchData(): void {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report;
        // Initialize selected state to false
        this.reports.forEach(report => {
          report.selected = false;
        });
        // Cross-reference with report selections
        this.markSelectedReports();
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }

  fetchReportSelection(): void {
    this.reportSelectionService.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections;
        // Filter report selections for the current annual_report_id
        this.reportSelections = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === this.annual_report_id;
        });
        // Cross-reference with reports
        this.markSelectedReports();
      },
      (error) => {
        console.log('Error fetching report selections:', error);
      }
    );
  }

  markSelectedReports(): void {
    if (this.reports.length && this.reportSelections.length) {
      this.reports.forEach(report => {
        const foundSelection = this.reportSelections.find((selection: any) => selection.report_id === report.report_id);
        report.selected = !!foundSelection; // Set to true if found, false otherwise
      });
    }
  }

  toggleCheckbox(report: any): void {
    report.selected = report.selected;
  }

  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.reports.forEach(report => {
      report.selected = this.selectAllChecked;
    });
  }

  createReportSelection(): void {
    const addRequests: Observable<any>[] = [];
    const deleteRequests: Observable<any>[] = [];

    this.reports.forEach(report => {
      const isReportSelected = this.reportSelections.some(selection => selection.report_id === report.report_id);

      if (isReportSelected && !report.selected) {
        deleteRequests.push(this.reportSelectionService.deleteReportSelection(this.annual_report_id, report.report_id));
      }
      else if (!isReportSelected && report.selected) {
        const payload = { report_id: report.report_id, annual_report_id: this.annual_report_id };
        addRequests.push(this.reportSelectionService.createReportSelection(payload));
      }
    });

    if (addRequests.length > 0 || deleteRequests.length > 0) {
      forkJoin([...addRequests, ...deleteRequests]).subscribe(
        (responses: any[]) => {

        },
        (error: any) => {
          this.error = 'No changes to submit';
        }
      );
    }

    // get all the reportSelections containing the current annual report id
    this.reportSelections = this.reportSelections.filter((selection: any) => {
      return selection.annual_report_id === this.annual_report_id;
    });


    this.reportSelectionService.getFilterReportSelections(this.annual_report_id).subscribe(
      (response) => {
        this.newReportSelections = response.data.reportSelections;

        this.newReportSelections.forEach((newSelection: any) => {
          this.annualContentArray.push(newSelection.body);
        });

        this.annualContent.annual_body = this.annualContentArray.join('<br>');

        this.annualContentService.createAnnualContent(this.annualContent).subscribe(
          (response) => {
            this.annualContent.annual_content_id = response.data.annual_content.annual_content_id;
            this.navigateToAnnualReportList()
          },
          (error) => {
            console.log('Error creating annual content:', error);
            this.navigateToAnnualReportList()
          }
        );

      },
      (error) => {
        console.log('Error fetching report selections:', error);
      }
    );




  }

  navigateToAnnualReportList(): void {
    this.route.navigate([`../../annualreport/${this.annual_report_id}/annual_content/${this.annualContent.annual_content_id}`], { relativeTo: this.aRoute });

 }

  navigateToViewAnnualReport(): void {
    this.route.navigate([`../../annualreportlist`], { relativeTo: this.aRoute });
 
  }
}