import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../../../../../shared/services/token.service';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  credentials = { email: '', password: '' };
  error: string | null = null;
  constructor(private authService: AuthenticationService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()?.length !== 0) {
      this.router.navigate(["/workspacelist"]); 
    }
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        const token = response.data.token;
        const userId = response.data.user_id;
  
        this.tokenService.setAuthorization(token, userId);
  
        this.router.navigate(['../workspacelist']);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.errors;
        
        // Clear the error message after 3 seconds
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    );
  }
  
}