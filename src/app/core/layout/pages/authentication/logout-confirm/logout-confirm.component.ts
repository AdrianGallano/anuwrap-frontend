import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../../shared/services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logout-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logout-confirm.component.html',
  styleUrl: './logout-confirm.component.css'
})
export class LogoutConfirmComponent {

  error: string | null = null;
  constructor(private router: Router, private tokenService: TokenService){}
  redirectToLogin(): void {
    this.tokenService.clearAuth();
    this.error = ("Error deleting token, please refresh the page!")
        setTimeout(() => {
          this.error = null;
        }, 3000);
  }

  redirectToDashboard(): void {
    this.router.navigate([`./workspacelist`])
  }
}
