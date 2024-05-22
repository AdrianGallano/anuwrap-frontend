import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';

@Component({
  selector: 'app-reportitem',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule, FormsModule],
  templateUrl: './reportitem.component.html',
  styleUrl: './reportitem.component.css'
})
export class ReportitemComponent implements OnInit {
  
facultyMatrixId: any;
reportId: any

report: any = {};
facultyMatrices: any[] = [];

  constructor(
    private reportService: ReportService,
    private aRoute: ActivatedRoute,
    private facultyMatrixService: FacultymatrixService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      console.log(this.reportId);
      this.fetchReport();
      this.fetchFacultyMatrices();
    });
  }

  fetchReport(): void {
    this.reportService.getReport(this.reportId).subscribe(
      (response) => {
        const fetchedReport = response.data.report;
        this.report = fetchedReport;
        console.log('Fetched Report:', this.report);
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }

  fetchFacultyMatrices(): void {
    this.facultyMatrixService.getFacultyMatrices(this.reportId).subscribe(
      (response) => {
        const facultyMatrices = response.data.facultyMatrix;
        console.log('All Faculty Matrices:', facultyMatrices);
  
        // Filter faculty matrices by report_id that matches this.reportId
        this.facultyMatrices = facultyMatrices.filter((matrix: any) => {
          console.log('Matrix report_id:', matrix.report_id);
          console.log('this.reportId:', this.reportId);
          return matrix.report_id === +this.reportId; // Ensure numeric comparison
        });
  
        console.log('Filtered Faculty Matrices:', this.facultyMatrices);
      },
      (error) => {
        console.log('Error fetching faculty matrices:', error);
      }
    );
  }

  navigateToReportView(reportId: any): void {
    console.log("this")
    this.route.navigate([`../../reportview/${reportId}`], { relativeTo: this.aRoute });
  }

}
