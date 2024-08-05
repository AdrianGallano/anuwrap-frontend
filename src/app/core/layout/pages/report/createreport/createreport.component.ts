import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { initFlowbite } from 'flowbite';
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
  predefinedTitles: string[] = [
    'Monthly Sales Report',
    'Quarterly Performance Summary',
    'Annual Financial Overview',
    'Departmental Review',
    'Project Milestone Report'
  ];
  selectedTitle: string = ''; 
  showCustomInput: boolean = false; 

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
    } else {
      console.error("Modal with id defaultModal not found or not initialized.");
    }
  }

  onTitleSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    
    if (selectedValue === 'custom') {
      this.showCustomInput = true;
      this.report.title = ''; // Clear the title for custom input
    } else {
      this.showCustomInput = false;
      this.report.title = selectedValue; // Set title from predefined selection
    }
  }

  createReport(): void {
    if (!this.report.title.trim()) {
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
        this.route.navigate([`../report/${this.reportId}`], { relativeTo: this.aRoute });
      },
      (error) => {
        this.error = "An error occurred while creating the report.";
      }
    );
  }

  goToReports() {
    this.route.navigate(['../reportlist'], { relativeTo: this.aRoute });
  }
}
