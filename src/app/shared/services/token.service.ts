import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'user_id';
  private headers: HttpHeaders | undefined;

  constructor(private cookieService: CookieService, private route: Router) { }

  setAuthorization(token: string, userId: string): void {
    this.cookieService.set(this.TOKEN_KEY, token);
    this.cookieService.set(this.USER_ID_KEY, userId);
  }

  storeToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token);
  }

  storeUserId(userId: string): void {
    this.cookieService.set(this.USER_ID_KEY, userId);
  }


  getAuth(): [string, string, HttpHeaders] | null {
    const token = this.cookieService.get(this.TOKEN_KEY);
    const userId = this.cookieService.get(this.USER_ID_KEY);
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return token && userId ? [token, userId, this.headers] : null;
  }

  clearAuth(): void {
    try {
      console.log('Clearing auth...');
      this.cookieService.delete(this.TOKEN_KEY);
      this.cookieService.delete(this.USER_ID_KEY);
      console.log('Auth cleared.');
      
      this.route.navigate(['/login']);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  }


  getUserId(): string | null {
    return this.cookieService.get(this.USER_ID_KEY);
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
