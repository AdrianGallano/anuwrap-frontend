import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ContentService } from '../../../../shared/services/content.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    EditorModule
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class ContentComponent {

  content = {
    report_id: 0,
    body: ''
  }
  

  constructor( private aRoute: ActivatedRoute, private route: Router, private contentservice: ContentService){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.content.report_id = +params['params']['report_id'];

      console.log(this.content)
    });
    const modal = document.getElementById('defaultModal');
        if (modal) {
        } else {
            console.error("Modal with id defaultModal not found or not initialized.");
        }
  }

  public editorConfig = {
    selector: "#editor",
    height: '700px',
    menubar: true,
    base_url: '/tinymce',
    suffix: '.min',
    toolbar_sticky: true,

    powerpaste_word_import: "clean",
    powerpaste_googledocs_import: "clean",
    powerpaste_html_import: "clean",

    autosave_restore_when_empty: true,
    autosave_interval: "60s",

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
                          max-width: 820px;
                          min-height: calc(100vh - 1rem);
                          padding: 4rem;
                      }
                  }`,
    plugins: 'save anchor autolink autosave  charmap code directionality fullscreen  image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount',
    toolbar: 'save undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | image media | table | codesample fullscreen | insertdatetime preview print | searchreplace | a11ycheck',
    setup: (editor: any) => {
      editor.on('init', this.initializeContent(editor));
    },
    save_onsavecallback: (editor: any) => {
      this.saveContent(editor);
    }
  };

  initializeContent(editor: any) {

    this.content.report_id = 1;

    this.contentservice.getContent(this.content.report_id).subscribe(
      (response) => {
        editor.setContent(response.data.content.body);
      },
      (error) => {
        console.log("Error content")
        console.log(error);
      }
    )
  }


  saveContent(editor: any): void {
    const contentBody = editor.getContent();

    this.content.body = contentBody;
    this.content.report_id = 1;


    this.contentservice.editContent(this.content, 1).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )

  }
}
