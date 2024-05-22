import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { initFlowbite } from 'flowbite';
import { ReportService } from '../../../../../shared/services/report.service';
import { relative } from 'path';

@Component({
  selector: 'app-createfacultymatrix',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './createfacultymatrix.component.html',
  styleUrl: './createfacultymatrix.component.css'
})
export class CreatefacultymatrixComponent {
  facultyMatrix = {
      report_id: 0,
      name: '',
      position: '',
      tenure: '',
      status: 1,
      related_certificate: '',
      doctorate_degree: '',
      masters_degree: '',
      baccalaureate_degree: '',
      specification: '',
      enrollment_status: '',
      designation: '',
      teaching_experience: 0,
      organization_membership: ''
    }
    reportId: any;

    constructor(
      private facultyMatrixService: FacultymatrixService,
      private route: Router,
      private aRoute: ActivatedRoute,
      private reportService: ReportService
    ) {}

    ngOnInit(): void {
      if (typeof document !== 'undefined') {
        initFlowbite();
      }
      this.aRoute.paramMap.subscribe((params: Params) => {
        this.facultyMatrix.report_id = params['params']['report_id'];
        console.log(this.facultyMatrix.report_id);
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

    createFacultyMatrix(): void {
      this.facultyMatrixService.createFacultyMatrix(this.facultyMatrix).subscribe(
        (response) => {
          console.log('Create Faculty Matrix Response:', response);
          this.route.navigate([`../../reportview/${this.facultyMatrix.report_id}`], { relativeTo: this.aRoute });
        },
        (error) => {
          console.error('Create Faculty Matrix Error:', error);
          console.log(this.facultyMatrix);
          console.log('Error Response:', error.error);
          console.log('Error Status:', error.status);
          console.log('Error Message:', error.message);
        }
      );
    } 
    
    navigateToReportView() {
      this.route.navigate([`../../reportview/${this.facultyMatrix.report_id}`], {relativeTo: this.aRoute}); 
    }
}
