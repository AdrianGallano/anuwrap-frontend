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
    report_type_id: '0',
    workspace_id: '',
  };
  reportId: any;
  reportTypes: any;

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
    this.fetchReportTypes();
    
  }

  fetchReportTypes(): void {
    this.reportService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data.reportType;
        console.log(this.reportTypes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchReport(): void {
    this.reportService.getReport(this.reportId).subscribe(
      (response) => {
        const fetchedReport = response.data.report;
        this.report.report_type_id = fetchedReport.report_type_id;
        this.report.title = fetchedReport.title;
        console.log(fetchedReport);
      },
      (error) => {
        console.log('Error fetching report:', error);
      }
    );
  }
  
  editReport(): void {
    this.report.workspace_id = this.workspaceId;
    this.report.report_type_id = this.report.report_type_id.toString();
    this.reportService.editReport(this.report, this.reportId).subscribe(
      (response) => {
        console.log('Edit Report Response:', response);
        this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute });
      },
      (error) => {
        console.log('Error editing report:', error);
      }
    );
  }
  
  goToReports(): void {
    this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute });
  }
}
