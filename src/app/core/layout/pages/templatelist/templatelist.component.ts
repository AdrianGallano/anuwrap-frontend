import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { TemplatelistParentComponent } from '../report/templatelist-parent/templatelist-parent.component';

@Component({
  selector: 'app-templatelist',
  standalone: true,
  imports: [RouterModule, TemplatelistParentComponent],
  templateUrl: './templatelist.component.html',
  styleUrl: './templatelist.component.css'
})
export class TemplatelistComponent {

  report = {
    report_id: 0,
    title: '',
    report_type_id: 0
  };

  constructor( private aRoute: ActivatedRoute, private route: Router){}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      const title = params['params']['title'];
      const reportTypeId = params['params']['report_type_id'];
      const reportId = params['params']['report_id'];

      this.report.report_type_id = reportTypeId ? parseInt(reportTypeId, 10) : 0;
      this.report.report_id = reportId ? parseInt(reportId, 10) : 0;
      this.report.title = title || '';
      console.log(this.report.report_id)
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
  }

  pickTemplate(): void {
    if (this.report.report_id) {
        this.route.navigate([`./content`, this.report.report_id], { relativeTo: this.aRoute });
    } else {
        console.error('Report ID is not available.');
    }
}


}
