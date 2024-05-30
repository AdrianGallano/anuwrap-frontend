import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { TemplatelistParentComponent } from '../report/templatelist-parent/templatelist-parent.component';
import { ContentService } from '../../../../shared/services/content.service';
import { response } from 'express';

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

  content = {
    report_id: 0,
    body: ''
  }

  contentId: number|undefined

  constructor( private aRoute: ActivatedRoute, private route: Router, private contService: ContentService){}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      const title = params['params']['title'];
      const reportTypeId = params['params']['report_type_id'];
      const reportId = params['params']['report_id'];

      this.report.report_type_id = reportTypeId ? parseInt(reportTypeId, 10) : 0;
      this.content.report_id = reportId ? parseInt(reportId, 10) : 0;
      this.report.title = title || '';
      console.log(this.content.report_id)
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
  }

  pickTemplate(): void {
    this.contService.createContent(this.content).subscribe(
        (response)=> {
            this.contentId = response.data.content.content_id;
            console.log(response)
            console.log(this.contentId)
            
                this.route.navigate([`./content/${this.contentId}`], { relativeTo: this.aRoute });

        }, (error)=> {
            console.error('Error creating content:', error);
        } 
    );
}



}
