import { Component } from '@angular/core';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleteaccomplishmentreport',
  standalone: true,
  imports: [],
  templateUrl: './deleteaccomplishmentreport.component.html',
  styleUrl: './deleteaccomplishmentreport.component.css'
})
export class DeleteaccomplishmentreportComponent {
  accomplishmentReport: any = {
    benefits_of_the_participants: '',
    date_of_activity: '',
    image_name: '',
    name_of_activity: '',
    narrative_report: '',
    nature_of_activity: '',
    report_id: '',
    venue_of_activity: ''
  };
  constructor(
    private accomplishmentReportService: AccomplishmentreportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.accomplishmentReport.accomplishment_report_id = params["params"]["accomplishment_report_id"];
    });
    this.fetchAccomplishmentReport();
  }

  fetchAccomplishmentReport(): void {
    this.accomplishmentReportService.getAccomplishmentReport(this.accomplishmentReport.accomplishment_report_id).subscribe(
      (response) => {
          this.accomplishmentReport.accomplishment_report_id = response.data.accomplishmentReport.accomplishment_report_id;
          this.accomplishmentReport.report_id = response.data.accomplishmentReport.report_id;
          this.accomplishmentReport.benefits_of_the_participants = response.data.accomplishmentReport.benefits_of_the_participants;
          this.accomplishmentReport.date_of_activity = response.data.accomplishmentReport.date_of_activity;
          this.accomplishmentReport.image_name = response.data.accomplishmentReport.image_name;
          this.accomplishmentReport.name_of_activity = response.data.accomplishmentReport.name_of_activity;
          this.accomplishmentReport.narrative_report = response.data.accomplishmentReport.narrative_report;
          this.accomplishmentReport.nature_of_activity = response.data.accomplishmentReport.nature_of_activity;
          this.accomplishmentReport.venue_of_activity = response.data.accomplishmentReport.venue_of_activity;
        },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  deleteAccomplishmentReport(): void {
    this.accomplishmentReportService.deleteAccomplishmentReport( this.accomplishmentReport.accomplishment_report_id).subscribe(
      (response: any) => {
          this.route.navigate([`../../viewaccomplishmentreport/${this.accomplishmentReport.report_id}`], { relativeTo: this.aRoute });
      },
      (error: any) => {
        console.error('Create Report Error:', error);
      }
    );
  }

  navigateToViewAccomplishReport(): void{
    this.route.navigate([`../../viewaccomplishmentreport/${this.accomplishmentReport.report_id}`], { relativeTo: this.aRoute });
  }
}
