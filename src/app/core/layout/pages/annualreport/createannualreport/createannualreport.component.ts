import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { ReportService } from '../../../../../shared/services/report.service';
@Component({
  selector: 'app-createannualreport',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './createannualreport.component.html',
  styleUrl: './createannualreport.component.css'
})
export class CreateannualreportComponent {

  annualReport= {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0,
    report_type_id:0
  }

  reportTypes: any;

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params["params"]["workspace_id"];
    });
    this.fetchReportTypes();
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

  createAnnualReport(): void {

    this.annualReportService.createAnnualReport(this.annualReport).subscribe(
      (response) => {
        this.annualReport.annual_report_id = response.data.annualReport.annual_report_id
        this.route.navigate([`../annualreport/${this.annualReport.annual_report_id}`], {relativeTo: this.aRoute})
    },
    (error) => {
        console.log(error);
    }
  );
}

navigateToAnnualReportList(){
  this.route.navigate([`../annualreportlist`], { relativeTo: this.aRoute });
}

}
