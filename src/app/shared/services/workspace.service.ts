import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = 'http://localhost/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getWorkspaces(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/users/${userId}/workspaces`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError(() => 'Unauthorized access');
    }
  }

  getWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/workspaces/${workspaceId}`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError(() => 'Unauthorized access');
    }
  }

  createWorkspace(workspaceData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/workspaces`, workspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  createUserWorkspace(userWorkspaceData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/userworkspaces`, userWorkspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editWorkspace(workspaceData: any, workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/workspaces/${workspaceId}`, workspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  deleteWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/workspaces/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getUserWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/${userId}/workspaces`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }
}
