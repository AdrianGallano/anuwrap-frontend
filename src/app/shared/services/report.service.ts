import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getReports(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports?workspace_id=${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getFacultyMatrixReport(reportTypeId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports?report_type_id=${reportTypeId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getAccomplishmentReport(reportTypeId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports?report_type_id=${reportTypeId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  deleteReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/reports/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReportType(): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/report-types`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  createReport(reportData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/reports`, reportData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editReport(report: any, reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/reports/${reportId}`, report, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
}
