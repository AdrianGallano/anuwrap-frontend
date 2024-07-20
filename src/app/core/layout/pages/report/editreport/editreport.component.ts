import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { initFlowbite } from 'flowbite';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';


@Component({
  selector: 'app-editreport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './editreport.component.html',
  styleUrl: './editreport.component.css'
})
export class EditreportComponent implements OnInit {
  workspaceId: any = null;
  report = {
    title: '',
    workspace_id: '',
  };
  reportId: any;
  error: string | null = null;

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private facultyMatrixService: FacultymatrixService,
    
  ) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = +params['params']['report_id'];
      this.workspaceId = params['params']['workspace_id'];
      this.fetchReport();
    });
    
  }


  fetchReport(): void {
    this.reportService.getReport(this.reportId).subscribe(
      (response) => {
        const fetchedReport = response.data.report;
        this.report.title = fetchedReport.title;
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }
  
  editReport(): void {
    this.report.workspace_id = this.workspaceId;
  
    this.reportService.editReport(this.report, this.reportId).subscribe(
      (response) => {
        this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute });
      },
      (error) => {
  
        // Clear the error message after 3 seconds
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    );
  }
  
  
  goToReports(): void {
    this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute });
  }
}
