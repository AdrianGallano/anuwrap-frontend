import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../../shared/services/report.service';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';

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
  checkedReports: number[] = [];
  annual_report_id: number | undefined;
  reportSelection: any[] = [];
  error = '';
  selectAllChecked: boolean = false;

  constructor(
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService,
    private reportSelect: ReportselectionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params['params']['workspace_id'];
      this.annual_report_id = +params['params']['annual_report_id'];
      this.fetchData();
      this.fetchReportSelection();
    });
  }

  fetchData(): void {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report;
        this.updateReportSelectionState(); // Update report selection state after fetching reports
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }
  
  fetchReportSelection(): void {
    this.reportSelect.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections;
        this.reportSelection = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === Number(this.annual_report_id);
        });
        this.updateReportSelectionState(); // Update report selection state after fetching report selections
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching report selection:', error);
      }
    );
  }
  
  updateReportSelectionState(): void {
    // Iterate through reports and update the 'selected' property based on report selections
    this.reports.forEach(report => {
      report.selected = this.reportSelection.some(selection => selection.report_id === report.report_id);
    });
  }

  toggleCheckbox(reportId: number): void {
    if (this.checkedReports.includes(reportId)) {
      this.checkedReports = this.checkedReports.filter((id) => id !== reportId);
    } else {
      this.checkedReports.push(reportId);
    }
  }

  toggleSelectAll(): void {
    this.reports.forEach(report => {
      report.selected = this.selectAllChecked;
    });
  }

  isChecked(reportId: number): boolean {
    return this.checkedReports.includes(reportId);
  }

  createReportSelection(): void {
    // Iterate through reports and perform actions based on 'selected' property
    this.reports.forEach(report => {
      if (report.selected) {
        const payload = {
          report_id: report.report_id,
          annual_report_id: this.annual_report_id // Include annual_report_id
        };
  
        this.reportSelect.createReportSelection(payload).subscribe(
          (response) => {
            console.log(`Report ${report.report_id} selection created.`);
            // Log content_id of the selected report
            console.log(`Content ID of report ${report.report_id}: ${report.content_id}`);
          },
          (error) => {
            console.error(`Error submitting report ${report.report_id}:`, error);
            console.log(this.annual_report_id);
            console.log(payload)
          }
        );
      } else {
        this.reportSelect.deleteReportSelection(this.annual_report_id, report.report_id).subscribe(
          (response) => {
            console.log(`Report ${report.report_id} selection deleted.`);
          },
          (error) => {
            console.error(`Error deleting report ${report.report_id}:`, error);
          }
        );
      }
    });
  
    this.route.navigate([`../../viewannualreport-accomplishmentreport/${this.annual_report_id}`], { relativeTo: this.aRoute });
  }
  


  navigateToAnnualReportList(): void {
    this.route.navigate([`../../annualreportlist`], { relativeTo: this.aRoute });
  }

  navigateToViewAnnualReport(): void {
    // Implement your navigation logic here
  }
}