import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollageService {
  private apiUrl = 'https://saddlebrown-hyena-720529.hostingersite.com/anuwrap-api/public/api';

  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createCollage(collageData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/collage`, collageData, {headers: headers});
    } else {
    // Handle unauthorized access
    return throwError('Unauthorized access');
    }
  }

  getCollage(collageId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth(); 

    if(authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/collage/${collageId}`, {headers: headers}).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching collage');
        })
      );
    } else {
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  editCollage(collageData: any, collageId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if(authInfo) {
      const headers =  authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/collage/${collageId}`, collageData, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  } 

  deleteCollage(collageData: any, collageId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if(authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/collage`, collageData, {headers: headers});
    } else{
      return throwError('Unauthorized access');
    }
  }
}
