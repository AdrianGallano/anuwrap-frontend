import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, throwError } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  
  editUserInformation(userData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authInfo[0]}`
      });
      return this.http.patch<any>(`${this.apiUrl}/users/${userId}`, userData, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  }

  getUserInformation(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authInfo[0]}`
      });
      return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  }

  createUserAvatar(avatar: any, userId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
  
      const formData = new FormData();
      formData.append('avatar', avatar); 
  
      return this.http.post<any>(`${this.apiUrl}/users/${userId}/avatar`, formData, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
}
  
}