import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-templatelist-parent',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './templatelist-parent.component.html',
  styleUrl: './templatelist-parent.component.css'
})
export class TemplatelistParentComponent {

  reportId = 0

  constructor( private aRoute: ActivatedRoute, private route: Router){}
  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params['params']['report_id'];

    });
  }
}
