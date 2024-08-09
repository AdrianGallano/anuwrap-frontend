import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost/anuwrap-api/public/api/images';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  uploadImage(file: File): Observable<any> {
    const user_id: any = this.tokenService.getUserId();
    const formData = new FormData();
    formData.append('image', file); 
    formData.append('user_id', user_id); 

    return this.http.post<any>(this.apiUrl, formData)
  }
  getAllImage(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getImage(imgId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${imgId}`);
  }

  deleteImage(imgId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${imgId}`);
  }
}
