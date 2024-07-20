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
    const deletePromises = this.reportIds.map(reportId => {
      return this.annualReportService.deleteAnnualReport(reportId).toPromise();
    });
  
    Promise.all(deletePromises).then(() => {
      setTimeout(() => {
        this.route.navigate(['../annualreportlist'], { relativeTo: this.aRoute });
      }, 1000); // Add a 1-second delay before redirecting
    }).catch(error => {
      console.log('Error deleting reports:', error);
    });
  }
  

  goToReports() {
    this.route.navigate(['../annualreportlist'], { relativeTo: this.aRoute })
  }

}
