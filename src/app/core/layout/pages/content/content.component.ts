import { Component } from '@angular/core';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

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
  public editorConfig = {
    selector: "#editor",
    height: '700px',
    menubar: true,
    base_url: '/tinymce',
    suffix: '.min',
    toolbar_sticky: true,
    icons: "thin",

    powerpaste_word_import: "clean",
    powerpaste_googledocs_import: "clean",
    powerpaste_html_import: "clean",

    autosave_restore_when_empty: true,
    autosave_interval: "60s",

    a11ychecker_html_version: "html5",
    a11ychecker_level: "aaa",

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
    plugins: 'a11ychecker advcode advlist anchor autolink autosave bdmap charmap code colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime legacyoutput link lists media mentions nonbreaking pagebreak paste powerpaste preview print quickbars searchreplace  secunity spellchecker table template textcolor textpattern toc visualblocks wordcount',
    toolbar: 'undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | image media | table | codesample fullscreen | insertdatetime preview print | searchreplace | a11ycheck',
    
  };

}
