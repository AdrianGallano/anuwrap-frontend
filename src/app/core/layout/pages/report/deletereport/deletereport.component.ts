import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';


@Component({
  selector: 'app-deletereport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './deletereport.component.html',
  styleUrl: './deletereport.component.css'
})
export class DeletereportComponent implements OnInit {
  workspaceId: any;
  reportId: any;
  report: any = {};
  constructor(private route: Router, private aRoute: ActivatedRoute, private reportService: ReportService, private facultyMatrixService: FacultymatrixService) {
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      this.fetchReport();
    });
  }

  goToReports() {
    this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute })
  }

  fetchReport(): void {
    this.reportService.getReport(this.reportId).subscribe(
      (response) => {
        const fetchedReport = response.data.report;
        this.report.report_type_id = fetchedReport.report_type_id;
        this.report.title = fetchedReport.title;
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  deleteReport(): void {
    if (this.reportId) {
      this.reportService.deleteReport(this.reportId).subscribe(
        (response) => {
          this.route.navigate(["../../reportlist"], { relativeTo: this.aRoute });
        },
      );
    } else {
      console.error('Report ID is missing.');
    }
  }

  deleteAllReport(): void {

  }
  

}
