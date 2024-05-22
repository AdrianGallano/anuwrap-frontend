import { Component } from '@angular/core';
import { AccomplishmentreportService } from '../../../../../shared/services/accomplishmentreport.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationBarComponent } from "../../../../../shared/navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-accomplishmentreportitem',
    standalone: true,
    templateUrl: './accomplishmentreportitem.component.html',
    styleUrl: './accomplishmentreportitem.component.css',
    imports: [NavigationBarComponent]
})
export class AccomplishmentreportitemComponent {
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
      console.log(this.accomplishmentReport.accomplishment_report_id)
    });
    this.fetchAccomplishmentReport();
  }

  fetchAccomplishmentReport(): void {
    this.accomplishmentReportService.getAccomplishmentReport(this.accomplishmentReport.accomplishment_report_id).subscribe(
      (response) => {
        console.log(response); 
         this.accomplishmentReport = response.data.accomplishmentReport;
          console.log('No accomplishment reports found');
        },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  navigateToViewAccomplishReport(): void{
    this.route.navigate([`../../viewaccomplishmentreport/${this.accomplishmentReport.report_id}`], { relativeTo: this.aRoute });
  }

}