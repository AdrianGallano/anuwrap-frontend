import { Component } from '@angular/core';
import { ReportService } from '../../../../../shared/services/report.service';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { NavigationBarComponent } from "../../../../../shared/navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-reportview',
    standalone: true,
    templateUrl: './reportview.component.html',
    styleUrl: './reportview.component.css',
    imports: [RouterModule, CommonModule, FormsModule, NavigationBarComponent]
})
export class ReportviewComponent {
facultyMatrixId: any;
reportId: any

report: any = {};
facultyMatrices: any[] = [];
reportTypes: any[] = [];

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private facultyMatrixService: FacultymatrixService
  ){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      this.fetchReport();
      this.fetchFacultyMatrices();
    });
  }

  fetchReport(): void {
    this.reportService.getReport(this.reportId).subscribe(
      (response) => {
        const fetchedReport = response.data.report;
        this.report = fetchedReport;
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
  
        // Filter faculty matrices by report_id that matches this.reportId
        this.facultyMatrices = facultyMatrices.filter((matrix: any) => {
          return matrix.report_id === +this.reportId; 
        });
      },
      (error) => {
        console.log('Error fetching faculty matrices:', error);
      }
    );
  }
  

  navigateToCreateFacultyMatrix() {
    this.route.navigate([`../../createfacultymatrix/${this.reportId}`], { relativeTo: this.aRoute });
  }

  navigateToEditFacultyMatrix(facultyMatrixId: number): void {
    this.route.navigate([`../../editfacultymatrix/${facultyMatrixId}`], { relativeTo: this.aRoute });
  }
  
  navigateToDeleteFacultyMatrix(facultyMatrixId: number): void {
    this.route.navigate([`../../deletefacultymatrix/${facultyMatrixId}`], { relativeTo: this.aRoute });
  }

  navigateToReportList() {
    this.route.navigate([`../../reportlist`], { relativeTo: this.aRoute });
  }

  navigateToReportItem(reportId: number): void {
    this.route.navigate([`../../reportitem/${reportId}`], { relativeTo: this.aRoute });
  }
}
