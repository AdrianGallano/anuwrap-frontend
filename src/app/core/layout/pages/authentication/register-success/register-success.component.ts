import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.css'
})
export class RegisterSuccessComponent {

  constructor(private router: Router) { }

  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
