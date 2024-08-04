import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentanceService {

  private apiUrl = 'http://localhost/anuwrap-api/public/api/sentences'
  constructor(private http: HttpClient) { }

  getText(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getTexts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createText(text: any): Observable<any> {
    return this.http.post(this.apiUrl, text);
  }

  editText(id: number, text: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, text);
  }

  deleteText(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
