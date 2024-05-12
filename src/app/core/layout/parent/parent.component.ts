import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  constructor(private router: Router) {}

  // Function to navigate to a specific child route
  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }

}