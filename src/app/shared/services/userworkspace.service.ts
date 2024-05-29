import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserworkspaceService {
  private apiUrl = 'http://localhost/anuwrap-api/public/api';
  constructor(private tokenService: TokenService, private http: HttpClient) { }


  getUserWorkspace(workspace_id: any): any {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/users/${userId}/workspaces/${workspace_id}/userworkspaces		`, { headers: headers });
    } else {
      return throwError(() => 'Unauthorized access');
    }

  }

  getUserWorkspacesWithWorkspace(workspace_id: any): any {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/userworkspaces?workspace_id=${workspace_id}`, { headers: headers });
    } else {
      return throwError(() => 'Unauthorized access');
    }
  }

  getUserWorkspaces() {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/userworkspaces?user_id=${userId}`, { headers: headers });
    } else {
      return throwError(() => 'Unauthorized access');
    }
  }

  createUserWorkspace(userWorkspaceData: any): any {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/userworkspaces`, userWorkspaceData, { headers: headers });
    } else {
      return throwError(() => 'Unauthorized access');
    }
  }

  deleteUserWorkspace(workspace_id: any): any {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/users/${userId}/workspaces/${workspace_id}/userworkspaces`, { headers: headers });
    } else {
      return throwError(() => 'Unauthorized access');
    }
  }
}











