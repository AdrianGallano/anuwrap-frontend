import { Component } from '@angular/core';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-viewaccomplishmentreport',
    standalone: true,
    templateUrl: './viewaccomplishmentreport.component.html',
    styleUrl: './viewaccomplishmentreport.component.css',
    imports: [CommonModule, FormsModule, AiComponent]
})
export class ViewaccomplishmentreportComponent {
  accomplishmentReport: any = {
    accomplishment_report_id: 0,
    benefits_of_the_participants: '',
    date_of_activity: '',
    image_name: '',
    name_of_activity: '',
    narrative_report: '',
    nature_of_activity: '',
    report_id: 0,
    venue_of_activity: ''
  };

  createError: string | null = null;
  deleteError: string | null = null;
  exportError: string | null = null;
  editError: string | null = null;

  constructor(
    private accomplishmentReportService: AccomplishmentreportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.accomplishmentReport.report_id = params["params"]["report_id"];
      this.fetchAccomplishmentReport();
    });
  }

  fetchAccomplishmentReport(): void {
    this.accomplishmentReportService.getAccomplishmentReports(this.accomplishmentReport.report_id).subscribe(
      (response) => {
        const accomplishmentReports = response.data.accomplishmentReports;
        if (accomplishmentReports && accomplishmentReports.length > 0) {
          const report = accomplishmentReports[0]; 
          this.accomplishmentReport.accomplishment_report_id = report.accomplishment_report_id;
          this.accomplishmentReport.benefits_of_the_participants = report.benefits_of_the_participants;
          this.accomplishmentReport.date_of_activity = report.date_of_activity;
          this.accomplishmentReport.image_name = report.image_name;
          this.accomplishmentReport.name_of_activity = report.name_of_activity;
          this.accomplishmentReport.narrative_report = report.narrative_report;
          this.accomplishmentReport.nature_of_activity = report.nature_of_activity;
          this.accomplishmentReport.venue_of_activity = report.venue_of_activity;
        } else {
          console.log('No accomplishment reports found');
        }
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }
  

  navigateToCreateAccomplishmentReport(): void {
    if (this.accomplishmentReport.accomplishment_report_id) {
      this.createError = "Accomplishment report already exists";
      setTimeout(() => {
        this.createError = null;
      }, 3000); // Clear the error message after 3 seconds
    } else {
      this.route.navigate([`../../createaccomplishmentreport/${this.accomplishmentReport.report_id}`], { relativeTo: this.aRoute });
    }
  }
  
  navigateToExport(): void {
    if (!this.accomplishmentReport.accomplishment_report_id) {
      this.exportError = "Accomplishment report does not exist";
      setTimeout(() => {
        this.exportError = null;
      }, 3000); // Clear the error message after 3 seconds
    } else {
      this.route.navigate([`../../accomplishmentreportitem/${this.accomplishmentReport.accomplishment_report_id}`], { relativeTo: this.aRoute });
    }
  }
  
  navigateToReportList(): void {
    this.route.navigate([`../../reportlist`], { relativeTo: this.aRoute });
  }
  
  navigateToEditAccomplishmentReport(): void {
    if (!this.accomplishmentReport.accomplishment_report_id) {
      this.editError = "Accomplishment report does not exist";
      setTimeout(() => {
        this.editError = null;
      }, 3000); // Clear the error message after 3 seconds
    } else {
      this.route.navigate([`../../editaccomplishmentreport/${this.accomplishmentReport.accomplishment_report_id}`], { relativeTo: this.aRoute });
    }
  }
  
  navigateToDeleteAccomplishmentReport(): void {
    if (!this.accomplishmentReport.accomplishment_report_id) {
      this.deleteError = "Accomplishment report does not exist";
      setTimeout(() => {
        this.deleteError = null;
      }, 3000); // Clear the error message after 3 seconds
    } else {
      this.route.navigate([`../../deleteaccomplishmentreport/${this.accomplishmentReport.accomplishment_report_id}`], { relativeTo: this.aRoute });
    }
  }
}