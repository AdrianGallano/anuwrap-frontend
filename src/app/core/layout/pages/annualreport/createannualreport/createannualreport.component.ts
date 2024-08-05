import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AnnualreportService } from '../../../../../shared/services/annualreport.service';
import { ReportService } from '../../../../../shared/services/report.service';
import { AiComponent } from "../../../../../shared/ai/ai.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createannualreport',
  standalone: true,
  templateUrl: './createannualreport.component.html',
  styleUrls: ['./createannualreport.component.css'],
  imports: [RouterModule, FormsModule, AiComponent, CommonModule]
})
export class CreateannualreportComponent implements OnInit {

  annualReport = {
    annual_report_id: 0,
    annualreport_title: '',
    description: '',
    workspace_id: 0,
    report_type_id: 0
  }

  predefinedAnnualTitles: string[] = [
    '2024 Accomplishment',
    '2024 Faculty Matrix',
    '2024 Teaching and Learning',
    '2024 Faculty Schedule',
    '2024 Event Report',
    '2024 Financial Report',
    '2024 Summary of Accomplishments',
    '2024 Syllabus'
  ];
  
  selectedTitle: string = ''; 
  error: string | null = null;

  constructor(
    private annualReportService: AnnualreportService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualReport.workspace_id = params['params']['workspace_id'];
    });
  }

  onTitleSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue === 'custom') {
      this.annualReport.annualreport_title = ''; // Allow user to type a custom title
    } else {
      this.annualReport.annualreport_title = selectedValue; // Set title from predefined selection
    }
  }

  createAnnualReport(): void {
    if (!this.annualReport.annualreport_title.trim()) {
      this.error = "Title is required";
      // Clear the error message after 3 seconds
      setTimeout(() => {
        this.error = null;
      }, 3000);
      return;
    }
    this.annualReportService.createAnnualReport(this.annualReport).subscribe(
      (response) => {
        this.annualReport.annual_report_id = response.data.annualReport.annual_report_id;
        this.route.navigate([`../annualreport/${this.annualReport.annual_report_id}`], { relativeTo: this.aRoute });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToAnnualReportList() {
    this.route.navigate([`../annualreportlist`], { relativeTo: this.aRoute });
  }
}
