import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportselectionService {
  private apiUrl = 'https://saddlebrown-hyena-720529.hostingersite.com/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createReportSelection(reportIds: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/report-selections`, reportIds, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editReportSelection( annualReportId: any, reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/annual-reports/${annualReportId}/reports/${reportId}/report-selections`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  deleteReportSelection(annualReportId: any, reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/annual-reports/${annualReportId}/reports/${reportId}/report-selections`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  getReportSelection(annualReportId: any, reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/annual-reports/${annualReportId}/reports/${reportId}/report-selections`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  getReportSelections(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/report-selections`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
}
