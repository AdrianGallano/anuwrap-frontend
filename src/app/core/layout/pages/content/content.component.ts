import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ContentService } from '../../../../shared/services/content.service';
import { HttpClient } from '@angular/common/http';
import tinymce from 'tinymce';
import { AiComponent } from "../../../../shared/ai/ai.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  imports: [EditorModule, AiComponent, CommonModule]
})
export class ContentComponent implements OnInit {
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
    plugins: 'save anchor autolink autosave charmap code directionality fullscreen image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount',
    toolbar: 'save undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | image media |insertFacultyNewTable | addPageButton | table | insertdatetime preview print | searchreplace | a11ycheck',
    setup: (editor: any) => {
      editor.ui.registry.addButton('addPageButton', {
        text: 'Add page',
        onAction: () => this.insertNewPage(editor)
      });

      editor.ui.registry.addButton('insertFacultyNewTable', {
        text: 'Add new row',
        onAction: () => this.insertFacultyNewRow(editor)
      });
      

      editor.on('init', () => this.initializeContent(editor));
    },
    save_onsavecallback: (editor: any) => {
      this.saveContent(editor);
    },
  };

  content = {
    report_id: 0,
    body: '',
  };

  successMessage = '';
  errorMessage = '';
  successTimeout: any;
  contentId: number | null | undefined;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private contentservice: ContentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.contentId = +params['params']['content_id'];
    });
    const modal = document.getElementById('defaultModal');
    if (modal) {
    } else {
      console.error('Modal with id defaultModal not found or not initialized.');
    }
  }

  initializeContent(editor: any) {
    this.contentservice.getContent(this.contentId).subscribe(
      (response) => {
        editor.setContent(response.data.content.body);
        this.content.report_id = response.data.content.report_id;
        this.content.body = response.data.content.body;
      },
      (error) => {
        console.log('Error content');
        console.log(error);
      }
    );
  }

  saveContent(editor: any): void {
    const contentBody = editor.getContent();
    this.content.body = contentBody;

    this.contentservice.editContent(this.content, this.contentId).subscribe(
      (response) => {
        this.successMessage = "Updated Successfully";
        this.showMessage('success');
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        this.errorMessage = "Update Failed";
        this.showMessage('error');
        this.cdr.detectChanges();
      }
    );
  }

  showMessage(type: string): void {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    this.successTimeout = setTimeout(() => {
      if (type === 'success') {
        this.successMessage = '';
      } else if (type === 'error') {
        this.errorMessage = '';
      }
      this.cdr.detectChanges();
    }, 3000);
  }

  navigateToReportList(): void {
    this.route.navigate([`../../../../reportlist`], { relativeTo: this.aRoute });
  }

  insertNewPage(editor: any): void {
    const newPage = `
    <hr>
    <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" width="81" height="90"></div>
    <p><span style="font-size: 12pt;"><img src="../../../../../assets/img/GC.png" width="76" height="76"></span></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
    <p style="line-height: 1.1;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: center;"><strong>Faculty</strong><br><span style="font-size: 12pt;"><strong>ACCOMPLISHMENT REPORT</strong></span><span style="font-weight: bold;"><br>2nd Semester A.Y. 2023 - 2024<br>&nbsp; &nbsp;&nbsp;</span></p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1; text-align: left;">&nbsp;</p>
    
    <p style="line-height: 1; text-align: left;"><span style="font-size: 14pt;"><strong><div class="break"></div></strong></span></p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p> 
    `;
    editor.insertContent(newPage);
  }

  insertFacultyNewRow(editor: any): void {
    const newRow = `
<table style="border-collapse: collapse; width: 94.4948%; height: 133.222px;" border="1"><colgroup><col style="width: 4.67128%;"><col style="width: 4.67128%;"><col style="width: 3.38499%;"><col style="width: 3.45269%;"><col style="width: 3.11419%;"><col style="width: 4.19738%;"><col style="width: 10.3581%;"><col style="width: 8.12397%;"><col style="width: 7.85317%;"><col style="width: 6.97307%;"><col style="width: 6.70227%;"><col style="width: 6.70227%;"><col style="width: 7.10847%;"><col style="width: 7.78547%;"><col style="width: 14.8262%;"></colgroup>
<tbody>
<tr style="height: 133.222px;">
<td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
<td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
<td style="text-align: center;">
<p><span style="font-size: 8pt;"></span></p>
</td>
</tr>
</tbody>
</table>

    `;
    editor.insertContent(newRow);
  }
  
}
