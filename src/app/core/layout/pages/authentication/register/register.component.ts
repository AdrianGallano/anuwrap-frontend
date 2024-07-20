import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule]
})
export class RegisterComponent {
  registrationData = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    status: 0,
    image_name: ''
  };

  errors = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    password1: ""
  }

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }

  registerUser() {
    this.authService.register(this.registrationData)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/register-success']);
        },
        (error) => {
          let errors = error.error.errors;
          this.errors["username"] = errors["username"];
          this.errors["email"] = errors["email"];
          this.errors.firstname = "username should contain only letters, numbers, and underscores";
          this.errors["lastname"] = errors["lastname"];
          this.errors["password"] = errors["password"];
          this.errors["password1"] = errors["password1"];
  
          // Clear the error messages after 3 seconds
          setTimeout(() => {
            this.errors = {
              username: '',
              email: '',
              firstname: '',
              lastname: '',
              password: '',
              password1: ''
            };
          }, 3000);
        }
      );
  }
  

}