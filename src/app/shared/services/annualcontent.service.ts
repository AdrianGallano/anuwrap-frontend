import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnualContentService {
  private apiUrl = 'http://localhost/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAnnualContents(): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/annual-contents`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching annualContent');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing annualContent ID');
    }
  }

  getAnnualContent(annualContentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/annual-contents/${annualContentId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching annualContent');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing annualContent ID');
    }
  }

  deleteAnnualContent(annualContentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/annual-contents/${annualContentId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting annualContent');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing annualContent ID');
    }
  }

  createAnnualContent(annualContentData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/annual-contents`, annualContentData, { headers: headers });
    } else
      return throwError('Unauthorized access');
  }

  editAnnualContent(annualContent: any, annualContentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/annual-contents/${annualContentId}`, annualContent, { headers: headers });
    } else
      return throwError('Unauthorized access');
  }
}
