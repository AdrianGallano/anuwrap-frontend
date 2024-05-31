import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { TokenService } from '../../../../../shared/services/token.service';
import { initFlowbite } from 'flowbite';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-createreport',
    templateUrl: './createreport.component.html',
    styleUrls: ['./createreport.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, AiComponent]
})
export class CreatereportComponent implements OnInit {
  workspaceId: any = null;
  report = {
    title: '',
    report_type_id: 0,
    workspace_id: 0
  };
  reportTypes: any;
  reportId: any;
  error= ""

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private tokenService: TokenService,
    private facultyMatrix: FacultymatrixService
  ) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.report.workspace_id = params['params']['workspace_id'];
      this.fetchReportTypes();
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
            // Initialize modal here using your modal library (e.g., Bootstrap, ng-bootstrap)
            // For example, if using Bootstrap's modal:
            // new bootstrap.Modal(modal).show();
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
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


  createReport(): void {

    

    this.reportService.createReport(this.report).subscribe(
      (response) => {
        this.reportId = response.data.report.report_id;

        this.route.navigate([`../report/${this.reportId}`], { relativeTo: this.aRoute })
        },
      (error) => {
        this.error = "Select a report type"
      }
    );
  }

  goToReports() {
    this.route.navigate(['../reportlist'], { relativeTo: this.aRoute });
  }
}