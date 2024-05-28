import { Component } from '@angular/core';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createaccomplishmentreport',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createaccomplishmentreport.component.html',
  styleUrl: './createaccomplishmentreport.component.css'
})
export class CreateaccomplishmentreportComponent {
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
      this.accomplishmentReport.report_id = params["params"]["report_id"];
    });
  }

  createAccomplishmentReport(): void {
    this.accomplishmentReportService.createAccomplishmentReport(this.accomplishmentReport).subscribe(
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
