import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent {
  constructor(private route: Router, private aRoute: ActivatedRoute) { }

  openChat(): void {
    this.route.navigate([`../chatwithai`], { relativeTo: this.aRoute });
  }
}
