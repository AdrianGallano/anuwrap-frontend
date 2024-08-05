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
    workspace_id: 0
  };
  reportId: any;
  error: string | null = null;

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.report.workspace_id = params['params']['workspace_id'];
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




  createReport(): void {
    if (!this.report.title) {
      this.error = "Title is required";
      // Clear the error message after 3 seconds
      setTimeout(() => {
        this.error = null;
      }, 3000);
      return;
    }
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