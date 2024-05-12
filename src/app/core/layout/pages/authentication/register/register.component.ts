import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule]
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
          let errors = error.error.errors
          this.errors["username"] = errors["username"];
          this.errors["email"] = errors["email"];
          this.errors["firstname"] = errors["firstname"];
          this.errors["lastname"] = errors["lastname"];
          this.errors["password"] = errors["password"];
          this.errors["password1"] = errors["password1"];
        }
      );
  }

}
