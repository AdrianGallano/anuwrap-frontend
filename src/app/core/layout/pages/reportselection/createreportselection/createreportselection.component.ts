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
  reportTypes: { report_type_id: number; name: string }[] = []; 
  selectedReportType: number | null = null;
  facultyMatrixReportTypeId: number | undefined;
  accomplishmentReportTypeId: number | undefined;
  error="";
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
    });
  }

  fetchReportTypes(): void {
    this.reportService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data.reportType; // Assign fetched reportTypes to the property

        // Find specific report_type_ids for Faculty Matrix and Accomplishment Report
        this.facultyMatrixReportTypeId = this.findReportTypeId('Faculty Matrix');
        this.accomplishmentReportTypeId = this.findReportTypeId('Accomplishment Report');
      },
      (error) => {
        console.log('Error fetching report types:', error);
      }
    );
  }

  findReportTypeId(reportName: string): number | undefined {
    const reportType = this.reportTypes.find(type => type.name === reportName);
    return reportType ? reportType.report_type_id : undefined;
  }

  fetchReportsByType(): void {
    if (!this.selectedReportType) {
      this.fetchData(); // Fetch all reports if no report type is selected
    } else if (this.selectedReportType === 1) {
      this.fetchFacultyMatrix(); // Fetch reports for Faculty Matrix
    } else if (this.selectedReportType === 2) {
      this.fetchAccomplishment(); // Fetch reports for Accomplishment
    }
  }

  fetchData(): void {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report;
        this.fetchReportSelection();
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }

  fetchFacultyMatrix(): void {
    this.reportService.getFacultyMatrixReport(this.facultyMatrixReportTypeId).subscribe(
      (response) => {
        this.reports = response.data.report;
        this.fetchReportSelection();
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching Faculty Matrix reports:', error);
      }
    );
  }

  fetchAccomplishment(): void {
    this.reportService.getAccomplishmentReport(this.accomplishmentReportTypeId).subscribe(
      (response) => {
        this.reports = response.data.report;
        this.fetchReportSelection();
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching Accomplishment reports:', error);
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
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.log('Error fetching report selection:', error);
      }
    );
  }

  toggleCheckbox(reportId: number): void {
    const index = this.checkedReports.indexOf(reportId);
    if (index === -1) {
      this.checkedReports.push(reportId); // Add to array if not already checked
    } else {
      this.checkedReports.splice(index, 1); // Remove from array if already checked
    }
  }

  isChecked(reportId: number): boolean {
    return this.reportSelection.some((selection) => selection.report_id === reportId);
  }

  createReportSelection(): void {
    if (this.checkedReports.length === 0) {
      this.error = "No reports selected";
  
      // Clear the error message after 3 seconds
      setTimeout(() => {
        this.error = '';
      }, 3000);
  
      return;
    }

    this.checkedReports.forEach((reportId) => {
      const isSelected = this.isChecked(reportId);

      if (isSelected) {
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
    
    // Redirect based on selected report type after submission
    if (this.selectedReportType === this.facultyMatrixReportTypeId) {
      this.route.navigate([`../../viewannualreport-facultymatrix/${this.annual_report_id}`], { relativeTo: this.aRoute });
    } else if (this.selectedReportType === this.accomplishmentReportTypeId) {
      this.route.navigate([`../../viewannualreport-accomplishmentreport/${this.annual_report_id}`], { relativeTo: this.aRoute });
    } else {
      // Default redirection to viewannualreport
      this.route.navigate([`../../viewannualreport/${this.annual_report_id}`], { relativeTo: this.aRoute });
    }
  }

  navigateToAnnualReportList(): void {
    this.route.navigate([`../../annualreportlist`], { relativeTo: this.aRoute });
  }

  navigateToViewAnnualReport(): void {
    if (this.selectedReportType === this.facultyMatrixReportTypeId) {
      this.route.navigate([`../../viewannualreport-facultymatrix/${this.annual_report_id}`], { relativeTo: this.aRoute });
    } else if (this.selectedReportType === this.accomplishmentReportTypeId) {
      this.route.navigate([`../../viewannualreport-accomplishmentreport/${this.annual_report_id}`], { relativeTo: this.aRoute });
    } else {
      // Default redirection to viewannualreport
      this.route.navigate([`../../annualreportlist`], { relativeTo: this.aRoute });
    }
  }

}