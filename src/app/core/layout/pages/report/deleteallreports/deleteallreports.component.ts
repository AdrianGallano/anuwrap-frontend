import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';

@Component({
  selector: 'app-deleteallreports',
  standalone: true,
  imports: [],
  templateUrl: './deleteallreports.component.html',
  styleUrl: './deleteallreports.component.css'
})
export class DeleteallreportsComponent {
  reportIds: number[] = [];

  constructor(
    private reportService: ReportService,
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
      this.reportService.deleteReport(reportId).subscribe(
        (response) => {
          this.route.navigate(['../reportlist'], { relativeTo: this.aRoute });
        },
        (error) => {
          console.log('Error deleting report:', error);
        }
      );
    });
  }

  goToReports() {
    this.route.navigate(['../reportlist'], { relativeTo: this.aRoute })
  }

}