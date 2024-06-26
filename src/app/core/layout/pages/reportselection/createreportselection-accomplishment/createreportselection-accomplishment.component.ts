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
  templateUrl: './createreportselection-accomplishment.component.html',
  styleUrl: './createreportselection-accomplishment.component.css'
})
export class CreatereportselectionAccomplishmentComponent {
  workspaceId: any;
  reports: any[] = [];
  checkedReports: number[] = [];
  annual_report_id: number | undefined;
  reportSelection: any[] = [];
  reportTypes:any[]=[];

  constructor(
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService,
    private reportSelect: ReportselectionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
      this.annual_report_id = params["params"]["annual_report_id"];
      this.fetchReportTypes();
      this.fetchData();
    });
  }

  fetchData(): void {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        const allReports = response.data.report || [];

        // Filter reports by report_type_id equal to 1
        this.reports = allReports.filter((report: any) => report.report_type_id === 2);

        // Manually trigger change detection after data update
        this.cdr.detectChanges();
        this.fetchReportSelection();
      },
      (error) => {
        console.log('Error fetching reports:', error);
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

  fetchReportSelection(): void {
    this.reportSelect.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections;
        this.reportSelection = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === Number(this.annual_report_id);
        });
        
        // Manually trigger change detection after data update
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Error fetching report selection:', error);
      }
    );
  }

  toggleCheckbox(reportId: number): void {
    const index = this.checkedReports.indexOf(reportId);
    if (index === -1) {
      // Checkbox was checked, add to array
      this.checkedReports.push(reportId);
    } else {
      // Checkbox was unchecked, remove from array
      this.checkedReports.splice(index, 1);
    }
  }

  isChecked(reportId: number): boolean {
    return this.reportSelection.some((selection) => selection.report_id === reportId);
  }

  createReportSelection(): void {
    if (this.checkedReports.length === 0) {
      console.log('No reports selected.');
      return;
    }

    this.checkedReports.forEach((reportId) => {
      if (this.isChecked(reportId)) {
        // Delete report selection for checked report
        this.reportSelect.deleteReportSelection(this.annual_report_id, reportId).subscribe(
          (response) => {
          },
          (error) => {
            console.error(`Error deleting report ${reportId}:`, error);
          }
        );
      } else {
        // Create report selection for unchecked report
        this.reportSelect.createReportSelection({ report_id: reportId, annual_report_id: this.annual_report_id }).subscribe(
          (response) => {
          },
          (error) => {
            console.error(`Error submitting report ${reportId}:`, error);
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
    this.route.navigate([`../../viewannualreport-facultymatrix/${this.annual_report_id}`], { relativeTo: this.aRoute });
  }
} 