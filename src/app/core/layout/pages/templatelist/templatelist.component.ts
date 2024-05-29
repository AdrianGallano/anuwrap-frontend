import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-templatelist',
  standalone: true,
  imports: [],
  templateUrl: './templatelist.component.html',
  styleUrl: './templatelist.component.css'
})
export class TemplatelistComponent {

  reportId= 0

  constructor( private aRoute: ActivatedRoute, private route: Router){}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params['params']['report_id'];
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
  }
}
