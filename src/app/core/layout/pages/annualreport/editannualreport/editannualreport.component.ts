import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { CommonModule } from '@angular/common';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-editannualreport',
    standalone: true,
    templateUrl: './editannualreport.component.html',
    styleUrl: './editannualreport.component.css',
    imports: [CommonModule, FormsModule, AiComponent]
})
export class EditannualreportComponent {
  annualReport= {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0
  }

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params["params"]["workspace_id"];
      this.annualReport.annual_report_id = params["params"]["annual_report_id"];

      this.fetchAnnualReport();
    });
  }

  fetchAnnualReport(): void {
    this.annualReportService.getAnnualReport(this.annualReport.annual_report_id).subscribe(
      (response) => {
        const fetchedAnnualReport = response.data.report;
        this.annualReport.annualreport_title = fetchedAnnualReport.annualreport_title;
        this.annualReport.description = fetchedAnnualReport.description;
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  editAnnualReport(): void {
    this.annualReportService.editAnnualReport(this.annualReport, this.annualReport.annual_report_id).subscribe(
      (response) => {
        this.route.navigate([`../../annualreportlist`], {relativeTo: this.aRoute})
    },
    (error) => {
        console.log(error);
    }
  );
}

navigateToAnnualReportList(){
  this.route.navigate([`../../annualreportlist`], { relativeTo: this.aRoute });
}

}
