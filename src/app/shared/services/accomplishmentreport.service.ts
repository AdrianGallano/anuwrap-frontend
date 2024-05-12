import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccomplishmentreportService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAccomplishmentReports(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/accomplishment-reports?report_id=${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getAccomplishmentReport(accomplishmentReportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/accomplishment-reports/${accomplishmentReportId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  deleteAccomplishmentReport(accomplishmentReportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/accomplishment-reports/${accomplishmentReportId}`, { headers: headers }).pipe(
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

  createAccomplishmentReport(reportData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/accomplishment-reports`, reportData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editAccomplishmentReport(report: any, accomplishmentReportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/accomplishment-reports/${accomplishmentReportId}`, report, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
}
