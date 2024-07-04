import { Component } from '@angular/core';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deleteallannualreports',
  standalone: true,
  imports: [],
  templateUrl: './deleteallannualreports.component.html',
  styleUrl: './deleteallannualreports.component.css'
})
export class DeleteallannualreportsComponent {
  reportIds: number[] = [];

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      if (params['reportIds']) {
        this.reportIds = params['reportIds'].split(',');
      }
    });
  }

  deleteReports(): void {
    this.reportIds.forEach(reportId => {
      this.annualReportService.deleteAnnualReport(reportId).subscribe(
        (response) => {
          this.route.navigate(['../annualreportlist'], { relativeTo: this.aRoute });
        },
        (error) => {
          console.log('Error deleting report:', error);
        }
      );
    });
  }

  goToReports() {
    this.route.navigate(['../annualreportlist'], { relativeTo: this.aRoute })
  }

}
