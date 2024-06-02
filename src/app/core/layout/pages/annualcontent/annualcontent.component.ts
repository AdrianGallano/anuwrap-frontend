import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AnnualContentService } from '../../../../shared/services/annualcontent.service';
import tinymce from 'tinymce';
import { AiComponent } from "../../../../shared/ai/ai.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annualcontent',
  standalone: true,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
],
imports: [EditorModule, AiComponent, CommonModule],
  templateUrl: './annualcontent.component.html',
  styleUrl: './annualcontent.component.css'
})
export class AnnualContentComponent implements OnInit{
  public editorConfig = {
    selector: '#editor',
    height: '700px',
    menubar: true,
    base_url: '/tinymce',
    suffix: '.min',
    toolbar_sticky: true,

    powerpaste_word_import: 'clean',
    powerpaste_googledocs_import: 'clean',
    powerpaste_html_import: 'clean',

    autosave_restore_when_empty: true,
    autosave_interval: '60s',

    pagebreak_separator: '<div class="break"></div>',

    tableofcontents_depth: 4,

    content_style: `
                  body {
                      background: #fff;
                  }
  
                  @media (min-width: 840px) {
                      html {
                          background: #eceef4;
                          min-height: 100%;
                          padding: 0 .5rem
                      }
  
                      body {
                          background-color: #fff;
                          box-shadow: 0 0 4px rgba(0, 0, 0, .15);
                          box-sizing: border-box;
                          margin: 1rem auto 0;
                          min-height: calc(100vh - 1rem);
                          padding: 4rem;
                      }
                  }`,
    plugins:
      'save anchor autolink autosave  charmap code directionality fullscreen  image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount',
    toolbar:
      'save undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | image media | table | codesample fullscreen | insertdatetime preview print | searchreplace | a11ycheck',
      setup: (editor: any) => {
        editor.on('init', () => this.initializeContent(editor));
    },
    save_onsavecallback: (editor: any) => {
      this.saveAnnualContent(editor);
    },
  };

  annualContentId: any;
  
  annual_content = {
    annual_report_id: 0,
    annual_body: '',
  };

  successMessage= '';
  errorMessage='';
  successTimeout: any;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private annualContentService: AnnualContentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.annualContentId = +params['params']['annual_content_id'];
    });
    const modal = document.getElementById('defaultModal');
    if (modal) {
    } else {
      console.error('Modal with id defaultModal not found or not initialized.');
    }
  }

  initializeContent(editor: any) {

    this.annualContentService.getAnnualContent(this.annualContentId).subscribe(
      (response) => {
        editor.setContent(response.data.annual_content.annual_body);
        this.annual_content.annual_report_id = response.data.annual_content.annual_report_id
        this.annual_content.annual_body = response.data.annual_content.annual_body
      },
      (error) => {
        console.log('Error annual_content');
        console.log(error);
      }
    );
  }

  saveAnnualContent(editor: any): void {
    const contentBody = editor.getContent();

    this.annual_content.annual_body = contentBody;

    this.annualContentService.editAnnualContent(this.annual_content, this.annualContentId).subscribe(
      (response) => {
        this.successMessage = "Updated Successfully"
        this.showMessage('success');
        
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        this.errorMessage = "Update Failed"
        this.showMessage('error');
        
        this.cdr.detectChanges();
      }
    );
  }

  showMessage(type: string): void {
    // Clear any existing timeout
    if (this.successTimeout) {
        clearTimeout(this.successTimeout);
    }

    // Set timeout to clear the message after 2 seconds
    this.successTimeout = setTimeout(() => {
        if (type === 'success') {
            this.successMessage = '';
        } else if (type === 'error') {
            this.errorMessage = '';
        }
        this.cdr.detectChanges(); // Trigger change detection to update the view
    }, 3000);
}

  navigateToAnnualReportList(): void {
    this.route.navigate([`../../../../annualreportlist`], {relativeTo: this.aRoute})
  }
}

