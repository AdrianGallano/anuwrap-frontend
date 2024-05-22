import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultymatrixService {
  private apiUrl = 'https://saddlebrown-hyena-720529.hostingersite.com/anuwrap-api/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createFacultyMatrix(facultyMatrix: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/faculty-matrices`, facultyMatrix, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  getFacultyMatrices(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/faculty-matrices`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getFacultyMatrix(FacultyMatrixId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/faculty-matrices/${FacultyMatrixId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  editFacultyMatrix(facultyMatrix: any, facultyMatrixId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/faculty-matrices/${facultyMatrixId}`, facultyMatrix, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  deleteFacultyMatrix(facultyMatrixId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/faculty-matrices/${facultyMatrixId}`, { headers: headers }).pipe(
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
