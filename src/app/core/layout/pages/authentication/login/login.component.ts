import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../../../../../shared/services/token.service';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule]
})
export class LoginComponent implements OnInit {
  credentials = { email: '', password: '' };
  error = "";
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
      }
    );
  }
}