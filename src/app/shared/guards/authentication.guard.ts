// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.tokenService.getToken()?.length === 0) {
      this.router.navigate(['/401']); // Navigate to the 401 page
      return false;
    }
    return true;
  }
}
