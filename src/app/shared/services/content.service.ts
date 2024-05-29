import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getContents(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/contents?workspace_id=${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching content');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing content ID');
    }
  }

  getContent(contentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/contents/${contentId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching content');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing content ID');
    }
  }

  deleteContent(contentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/contents/${contentId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting content');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing content ID');
    }
  }

  createContent(contentData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/contents`, contentData, { headers: headers });
    } else
      return throwError('Unauthorized access');
  }

  editContent(content: any, contentId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/contents/${contentId}`, content, { headers: headers });
    } else
      return throwError('Unauthorized access');
  }
}
