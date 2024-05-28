import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FacultymatrixService } from '../../../../../shared/services/facultymatrix.service';
import { initFlowbite } from 'flowbite';
import { ReportService } from '../../../../../shared/services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editfacultymatrix',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './editfacultymatrix.component.html',
  styleUrl: './editfacultymatrix.component.css'
})
export class EditfacultymatrixComponent {
  facultyMatrix = {
    faculty_matrix_id: 0,
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
      this.facultyMatrix.faculty_matrix_id = params['params']['faculty_matrix_id'];
      this.fetchFacultyMatrix();
    });
  }


  fetchFacultyMatrix(): void {
    this.facultyMatrixService.getFacultyMatrix(this.facultyMatrix.faculty_matrix_id).subscribe(
      (response) => {
        this.facultyMatrix.faculty_matrix_id = response.data.facultyMatrix.faculty_matrix_id;
        this.facultyMatrix.report_id = response.data.facultyMatrix.report_id;
        this.facultyMatrix = response.data.facultyMatrix;
      },
      (error) => {
        console.log('Error fetching faculty matrices:', error);
      }
    );
  }  
  
  editFacultyMatrix(): void {
    this.facultyMatrixService.editFacultyMatrix(this.facultyMatrix, this.facultyMatrix.faculty_matrix_id).subscribe(
      (response) => {
        this.route.navigate([`../../reportview/${this.facultyMatrix.report_id}`], { relativeTo: this.aRoute });
      },
      (error) => {
        console.error('Create Faculty Matrix Error:', error);
      }
    );
  }

  navigateToReportView() {
    this.route.navigate([`../../reportview/${this.facultyMatrix.report_id}`], { relativeTo: this.aRoute });
  }
}
