import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { TokenService } from '../../../../../shared/services/token.service';
import { initFlowbite } from 'flowbite';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CreatereportComponent implements OnInit {
  workspaceId: any = null;
  report = {
    title: '',
    workspace_id: '',
  };
  reportTypes: any;
  reportId: any;
  error: string | null = null;
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
      console.log(this.report.workspace_id)
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
  }

  createReport(): void {
    this.route.navigate([`../templatelist/${this.report.workspace_id}/${this.report.title}`], { relativeTo: this.aRoute }).catch(error => {
      console.log(error);
    });
  }   
  
  goToReports() {
    this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute });
  }
}
