import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ContentService } from '../../../../shared/services/content.service';
import { HttpClient } from '@angular/common/http';
import tinymce, { Editor } from 'tinymce';
import { AiComponent } from "../../../../shared/ai/ai.component";
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { SentanceService } from '../../../../shared/services/sentance.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageTextComponent } from '../../../../shared/popup/manage-text/manage-text.component';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  imports: [EditorModule, AiComponent, CommonModule, DragDropModule ]
})
export class ContentComponent implements OnInit {
  editor: any; // Declare editor property
  sentences: any[] = [];
  private pollingSubscription: Subscription | null = null;
  private readonly POLLING_INTERVAL = 5000;
  
  editorConfig = {
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
    @media (min-width: 840px) {
      html {
        background: #eceef4;
        min-height: 100%;
        padding: 0 .5rem;
      }
  
      body {
        background-color: #fff;
        margin: 1rem auto 0;
        min-height: calc(100vh - 1rem);
        box-sizing: border-box;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 794px;
        height: auto;
        position: relative;
      }


      .whole-page {
        background-color: #fff;
        width: 100%;
        min-height: 1123px;
        height: auto;
        position: relative;

      }

      .whole-page-with-table {

        background-color: #fff;
        width: 100%;
        height: auto;
        box-shadow: 0 0 4px rgba(0, 0, 0, .15);
        box-sizing: border-box;
        position: relative;

      }

      .faculty-content {
    padding: 10px;
  }

  .faculty-table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* Ensures columns are fixed width */
  }

  th, td {
    border: 1px solid #000;
    padding: 5px;
    text-align: center;
    font-size: 8pt;
    word-wrap: break-word; /* Ensures text wraps within the cell */
    white-space: normal; /* Allows text to wrap to new lines */
  }

  th[colspan], td[colspan] {
    text-align: center;
  }

  .ccs-logo img, .gc-logo img {
    max-width: 100px; /* Limits the logo size */
    height: auto;
  }

  .faculty-header {
    text-align: center;
  }

  .faculty-header p {
    margin: 0;
  }

  .text-blue-500 {
    color: blue;
    text-decoration: underline;
  }


      .import-whole-page {

        background-color: #fff;
        width: 100%;
        height: auto;
        box-shadow: 0 0 4px rgba(0, 0, 0, .15);
        box-sizing: border-box;
        position: relative;

      }

      .import-whole-page-landscape {

        background-color: #fff;
        width: 1123px;
        height: auto;
        box-shadow: 0 0 4px rgba(0, 0, 0, .15);
        box-sizing: border-box;
        position: relative;

      }

      .content {
      width: 100%;
      height: auto;
      }

      .teaching-header {
      position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: block;
    margin: 0 auto;
    text-align: center;
      }

/* General content body */
.content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 100px;
  position: relative;
  height: auto;
}

/* Faculty content body */
.faculty-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 200px;
  position: relative;
  height: auto;
}

/* Teaching content body */
.teaching-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 220px;
  position: relative;
  height: auto;
}

/* Faculty schedule content body */
.facultysched-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 150px;
  position: relative;
  height: auto;
}

/* Event content body */
.event-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 150px;
  position: relative;
  height: auto;
}

/* Financial content body */
.financial-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 150px;
  position: relative;
  height: auto;
}

/* Summary content body */
.summary-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 150px;
  position: relative;
  height: auto;
}

/* Syllabus content body */
.syllabus-content-body {
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 150px;
  position: relative;
  height: auto;
}


      .content-body table {
        width: 100%;
        height: auto;
        table-layout: fixed;
        border-collapse: collapse;
      }

      .content-body th, .content-body td {
        border: 1px solid #ddd;
        padding: 8px;
        word-wrap: break-word; 
        overflow: hidden; 
        text-align: center;
      }

      .content-body tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      .content-body tr:hover {
        background-color: #ddd;
      }

      .content-body img {
      max-height: 500px;
      max-width: 80%;
      margin: 0 auto;
      }
  
      
  
      .handle {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #000;
        cursor: pointer;
      }
  
      .handle.top-left {
        top: 0;
        left: 0;
        cursor: nwse-resize;
      }
  
      .handle.top-right {
        top: 0;
        right: 0;
        cursor: nesw-resize;
      }
  
      .handle.bottom-left {
        bottom: 0;
        left: 0;
        cursor: nesw-resize;
      }
  
      .handle.bottom-right {
        bottom: 0;
        right: 0;
        cursor: nwse-resize;
      }


  .collage-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid #000;
  position: absolute;
  padding: 10px;
  cursor: move;
  margin: 0 auto;
}

.img-wrapper {
  cursor: move;
  gap: 10px;
  flex-wrap: wrap;
  border: 1px solid #000;
  position: absolute;
  padding: 10px;
  display: inline-block;
  margin: 0 auto;
}

.collage-container > div,
.img-wrapper > div {
  flex: 1 1 calc(33% - 10px);
  overflow: hidden;
  max-height: 900px;
}



.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  max-height: 200px;
  background-color: #ccc;
}

.image-placeholder img {
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
}



      .header img,
      .footer img {
        width: 100%;
        display: block;
      }
  
      .header,
      .footer {
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
  
      .footer {
        margin-top: 1rem;
      }
  
      .gc-logo img {
        width: 128px;
        height: 128px;
      }
      
      .ccs-logo img {
        width: 130px;
        height: 130px;
      }
    }
  
    @media print {
    @page {
      size: auto;
      margin: 0;
    }

    body {
      background-color: rgba(0,0,0,0);
      margin: 0;
      padding: 0;
      position: relative;
      display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    /* Print only the whole-page content */
    body > *:not(.whole-page, .import-whole-page, .import-whole-page-landscape, .whole-page-with-table) {
      display: none;
    }
      .whole-page {
        background-color: #fff;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        page-break-after: always;
        position: relative;
      }

      .whole-page-with-table {
        background-color: #fff;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        page-break-after: always;
        position: relative;
      }

      .faculty-content {
    padding: 10px;
  }

  .faculty-table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* Ensures columns are fixed width */
  }

  th, td {
    border: 1px solid #000;
    padding: 5px;
    text-align: center;
    font-size: 8pt;
    word-wrap: break-word; /* Ensures text wraps within the cell */
    white-space: normal; /* Allows text to wrap to new lines */
  }

  th[colspan], td[colspan] {
    text-align: center;
  }

  .ccs-logo img, .gc-logo img {
    max-width: 100px; /* Limits the logo size */
    height: auto;
  }

  .faculty-header {
    text-align: center;
  }

  .faculty-header p {
    margin: 0;
  }

  .text-blue-500 {
    color: blue;
    text-decoration: underline;
  }


      .import-whole-page {
        background-color: #fff;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        page-break-after: always;
        position: relative;

      }

      .import-whole-page-landscape {

        background-color: #fff;
        width: 1123px;
        height: auto;
        box-shadow: 0 0 4px rgba(0, 0, 0, .15);
        box-sizing: border-box;
        position: relative;

      }

      .content {
        page-break-inside: avoid; 
        position: relative;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
      }

      // .faculty-content {
      //  margin-top: 0;
      //   margin-buttom: 0;
      //   margin-left: 2rem;
      //   margin-right: 2rem;
      //   page-break-inside: avoid; 
      //   position: relative;
      //   }

        .teaching-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
        }

        .facultysched-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
        }

        .event-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
        }

        .financial-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
        }

        summary-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
        }

        .syllabus-content {
         margin-top: 0;
        margin-buttom: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        page-break-inside: avoid; 
        position: relative;
          
        }

  .collage-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid #000;
  padding: 10px;
  margin: 0 auto;
}

.img-wrapper {

  gap: 10px;
  flex-wrap: wrap;
  border: 1px solid #000;
  padding: 10px;
  display: inline-block;
  margin: 0 auto;
}

.collage-container > div,
.img-wrapper > div {
  flex: 1 1 calc(33% - 10px);
  overflow: hidden;
  max-height: 900px;
}



.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  max-height: 200px;
  background-color: #ccc;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
}

      .header img,
      .footer img {
        width: 100%;
        display: block;
      }

      /* Headers */
  .faculty-header, .teaching-header, .facultysched-header, .event-header, .financial-header, .summary-header, .syllabus-header {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: block;
    margin: 0 auto;
    text-align: center;
  }

  .header {
  display: block;
   position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .footer {
  position: absolute;  
    width: 100%;
    bottom: 0;
    z-index: 1000; 
  }

  /* General content body */
  .content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 100px;
    position: relative;
    height: auto;
  }
  
  /* Faculty content body */
  .faculty-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 200px;
    position: relative;
    height: auto;
  }
  
  /* Teaching content body */
  .teaching-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 220px;
    position: relative;
    height: auto;
  }
  
  /* Faculty schedule content body */
  .facultysched-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 150px;
    position: relative;
    height: auto;
  }
  
  /* Event content body */
  .event-content-body {
    padding: 0 2rem;
    padding-top: 150px;
    position: relative;
    height: auto;
  }
  
  /* Financial content body */
  .financial-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 150px;
    position: relative;
    height: auto;
  }
  
  /* Summary content body */
  .summary-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 150px;
    position: relative;
    height: auto;
  }
  
  /* Syllabus content body */
  .syllabus-content-body {
    margin: 0 auto;
    padding: 0 2rem;
    padding-top: 150px;
    position: relative;
    height: auto;
  }


      .gc-logo img{
        width: 128px;
        height: 128px;
        padding: 2px
      }
      
      .ccs-logo img{
        width: 130px;
        height: 130px;
        padding: 2px;
      }

      .content-body table {
    width: 100%;
    height: auto;
    table-layout: fixed;
  }

  .content-body th, .content-body td {
    word-wrap: break-word;
    overflow: hidden;
  }
.content-body img {
max-height: 500px;
max-width: 80%;
margin: 0 auto;
}

      table {
      page-break-inside: avoid;
      margin: 0 auto;
      }
    }
  `,  
    plugins: 'powerpaste save anchor autolink autosave charmap code directionality fullscreen image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount',
    toolbar: 'uploadCustomFile | save undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | insertSentence | addHeader | insertImgContainer | table | insertCollage | insertdatetime preview print | searchreplace | a11ycheck',
    
    setup: (editor: any) => {
      this.editor = editor;

      editor.ui.registry.addButton('uploadCustomFile', {
        text: 'Import File',
        onAction: () => this.openFilePicker(editor)
      });

      editor.ui.registry.addButton('addHeader', {
        text: 'Add Header',
        onAction: () => this.insertHeader(editor)
      });

      editor.ui.registry.addMenuButton('insertSentence', {
        text: 'Insert Sentence',
        fetch: (callback: any) => {
          const items = this.sentences.map((sentence: any) => ({
            type: 'menuitem',
            text: sentence.text,
            onAction: () => this.insertSentence(editor, sentence.text)
          }));
          callback(items);
        }
      });
      
      // editor.ui.registry.addMenuButton('addPageButton', {
      //   text: 'Add Page',
      //   fetch: (callback: any) => {
      //   const items = [
      //       { type: 'menuitem', text: 'Accomplishment Report Page', onAction: () => this.insertNewAccomplishmentPage(editor) },
      //       { type: 'menuitem', text: 'Faculty Matrix Report Page', onAction: () => this.insertNewFacultyPage(editor) },
      //       { type: 'menuitem', text: 'Teaching And Learning Report Page', onAction: () => this.insertNewTeachingPage(editor) },
      //       { type: 'menuitem', text: 'Faculty Schedule Report Page', onAction: () => this.insertNewFacultySchedPage(editor) },
      //       { type: 'menuitem', text: 'Event Report Page', onAction: () => this.insertNewEventReportPage(editor) },
      //       { type: 'menuitem', text: 'Financial Report Page', onAction: () => this.insertNewFinancialReportPage(editor) },
      //       { type: 'menuitem', text: 'Summary Of Accomplishment Report Page', onAction: () => this.insertNewSummaryReportPage(editor) },
      //       { type: 'menuitem', text: 'Syllabus Report Page', onAction: () => this.insertNewSyllabusReportPage(editor) }
      //     ];
      //     callback(items);
      //   }
      // });

      editor.ui.registry.addMenuButton('insertCollage', {
        text: 'Add Collage',
        fetch: (callback: any) => {
          const items = [
            { type: 'menuitem', text: 'Double', onAction: () => this.insertCollage(editor, 2) },
            { type: 'menuitem', text: 'Triple', onAction: () => this.insertCollage(editor, 3) },
            { type: 'menuitem', text: 'Quadruple', onAction: () => this.insertCollage(editor, 4) },
          ];
          callback(items);
        }
      });

      editor.ui.registry.addButton('insertImgContainer', {
        text: 'Add Image',
        onAction: () => this.insertImgContainer(editor)
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
  isBrowser: boolean;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
    private sentenceService: SentanceService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.startPolling();
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.contentId = +params['params']['content_id']; 
    });

    const modal = document.getElementById('defaultModal');
    if (!modal) {
      console.error('Modal with id defaultModal not found or not initialized.');
    }

    if (this.isBrowser) {
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  
  initializeContent(editor: any) {
    console.log('Initializing content...');
    this.contentService.getContent(this.contentId).subscribe(
      (response) => {
        console.log('Content fetched:', response);
        this.content.report_id = response.data.content.report_id;
        this.content.body = response.data.content.body;
        console.log(this.content.body);
        editor.setContent(this.content.body);

        this.setupDragAndDrop(editor)
        
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
  }
  
  
  


  openFilePicker(editor: any): void {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', '.csv, .xlsx, .xls, .doc, .docx');

    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      const reader: FileReader = new FileReader();

      reader.onload = (event: any) => {
        const contents: string | ArrayBuffer = event.target.result;
        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          this.handleExcel(contents as string);
        } else if (file.name.endsWith('.csv')) {
          this.handleCSV(contents as string);
        } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
          this.handleDoc(contents as ArrayBuffer);
        } else {
          console.error('Unsupported file format');
        }
      };

      if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsBinaryString(file);
      }
    };

    fileInput.click();
  }

  private handleExcel(contents: string): void {
    const workbook = XLSX.read(contents, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const excelData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });
  
    const htmlTable = this.convertExcelToHtmlTable(excelData);
    this.updateEditorContentLandscape(htmlTable);
  }
  
  private handleCSV(contents: string): void {
    const lines: string[] = contents.split('\n');
    const csvData = lines.map(line => line.split(','));
  
    const htmlTable = this.convertExcelToHtmlTable(csvData);
    this.updateEditorContentLandscape(htmlTable);
  }
  
  private handleDoc(contents: ArrayBuffer): void {
    mammoth.convertToHtml({ arrayBuffer: contents }).then(result => {
      this.updateEditorContent(result.value);
    }).catch(error => {
      console.error('Error converting DOCX to HTML:', error);
    });
  }
  
  private convertExcelToHtmlTable(excelData: any[]): string {
    let html = '<table>';
    excelData.forEach(row => {
      html += '<tr>';
      row.forEach((cell: any) => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  }
  
  

  private updateEditorContent(content: string): void {
    if (this.editor) {
      const wrappedContent = `
        <div class="import-whole-page">
          <div class="content">
            <div class="content-body">
              ${content}
            </div>
          </div>
        </div>
        <div class="break"></div>
      `;
      this.editor.setContent(wrappedContent);
    } else {
      console.error('TinyMCE editor instance is not available.');
    }
  }

  private updateEditorContentLandscape(content: string): void {
    if (this.editor) {
      const wrappedContent = `
        <div class="import-whole-page-landscape">
          <div class="content">
            <div class="content-body">
              ${content}
            </div>
          </div>
        </div>
        <div class="break"></div>
      `;
      this.editor.setContent(wrappedContent);
    } else {
      console.error('TinyMCE editor instance is not available.');
    }
  }
  
  

  // Class method to convert Blob URL to Base64
  async blobUrlToBase64(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Method to replace blob URLs with base64 URLs
  async replaceBlobUrlsWithBase64(htmlContent: string): Promise<string> {
    const blobUrlRegex = /blob:http:\/\/localhost:4200\/[a-f0-9\-]+/g;
    const blobUrls = htmlContent.match(blobUrlRegex);
    if (!blobUrls) return htmlContent;

    for (const blobUrl of blobUrls) {
      try {
        const base64Url = await this.blobUrlToBase64(blobUrl);
        htmlContent = htmlContent.replace(blobUrl, base64Url);
      } catch (error) {
        console.error('Error converting blob URL:', blobUrl, error);
      }
    }

    return htmlContent;
  }

  // Save content method
  saveContent(editor: any): void {
    const contentBody = editor.getBody().innerHTML; // Get entire HTML content

    // Find and replace all blob URLs with base64 URLs
    this.replaceBlobUrlsWithBase64(contentBody).then((updatedContent) => {
      this.content.body = updatedContent;
      console.log(updatedContent);

      this.contentService.editContent(this.content, this.contentId).subscribe(
        (response) => {
          this.successMessage = "Updated Successfully";
          this.showMessage('success');
          this.cdr.detectChanges();
          this.initializeContent(editor);
        },
        (error) => {
          console.log(error);
          this.errorMessage = "Update Failed";
          this.showMessage('error');
          this.cdr.detectChanges();
        }
      );
    }).catch((error) => {
      console.log('Error converting blob URLs to base64:', error);
    });
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


  insertNewEmptyPage(editor: Editor): void {
    const newPage =`<div class="whole-page" style="height: 1123px">

</div>
<p><div class="break"></div></p>`
    editor.insertContent(newPage)
  }
  

  insertNewAccomplishmentPage(editor: Editor): void {
    const newPage = `<div class="whole-page">
<div class="content">
<div class="header"><img src="../../../../../assets/img/header2.jpg" width="1380" height="172"></div>
<div class="content-body">
<p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">BSEMC Accomplishment Comprehensive Narrative Report</span></strong></p>
<p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Renewal of Institutional Membership for Animation Council of the Philippines (ACPI)</span></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>
<p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Gordon College &ndash; College of Computer Studies renewed it&rsquo;s academic membership with Animation Council of the Philippines (ACPI). This renewal signifies our unwavering commitment in the field of animation and our dedication to supporting the initiatives of ACPI. Our institution has long recognized the vital role played by ACPI in advancing and promoting the field of animation in the Philippines. Since our initial membership commencement on September 2021, our active involvement in ACPI has been a source of pride. Renewing our membership was a natural choice to maintain our contributions to the growth and development of our BSEMC students in the field of animation.</span></p>
<p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">The renewal of our institutional membership with the Animation Council of the Philippines is a testament to our enduring commitment to the growth and excellence our BSEMC Students in the field of animation. We eagerly anticipate continuing our active involvement, collaborating with fellow members and academic institutions, and contributing to ACPI's mission to further enhance the country's animation landscape.</span></p>
<div class="collage-wrapper" style="width: 600px; height: auto; resize: both; overflow: hidden; margin: 0 auto;">
<div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
</div>
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
</div>
</div>
<div class="text-box" style="flex: 1; min-height: 50px; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;" contenteditable="true">CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.</div>
</div>
<p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp;</span></p>
</div>
</div>
</div>
<p><div class="break"></div></p>`;
    editor.insertContent(newPage);
  }

  insertNewFacultyPage(editor: any): void {
    const newPage = `
    <div class="whole-page-with-table">
    <div class="faculty-content">
    <div class="faculty-header">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" alt="CCS Logo"></div>
    <p class="gc-logo"><span style="font-size: 12pt;"> <img style="float: left;" src="../../../../../assets/img/GC.png" alt="GC Logo"> </span></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines</span><br><span style="font-size: 8pt;">City Of Olongapo</span><br><span style="font-weight: bold;">GORDON COLLEGE<br>COLLEGE OF COMPUTER STUDIES</span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200<br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a> </span></p>
    <p style="line-height: 1.1; text-align: center;"><strong>FACULTY MATRIX</strong><br>2nd Semester A.Y. 2023-2024</p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    </div>
    <div class="faculty-content-body">
    <div class="faculty-table-wrapper">
    <table style="width: 100%; height: 374.8px;"><colgroup><col style="width: 4.56615%;"><col style="width: 4.56615%;"><col style="width: 5.00102%;"><col style="width: 3.58769%;"><col style="width: 3.37025%;"><col style="width: 5.65333%;"><col style="width: 14.242%;"><col style="width: 6.52307%;"><col style="width: 5.76204%;"><col style="width: 8.47999%;"><col style="width: 8.47999%;"><col style="width: 7.06666%;"><col style="width: 6.30732%;"><col style="width: 8.26087%;"><col style="width: 8.04512%;"></colgroup>
    <tbody>
    <tr style="height: 28.525px;">
    <td colspan="3">Name</td>
    <td rowspan="2">AGE</td>
    <td rowspan="2">SEX</td>
    <td rowspan="2">TENURE<br>(P/COS)</td>
    <td rowspan="2">Related Certification/Appropriate Current PRC License</td>
    <td colspan="5">Educational Background (Specify Degree Obtained)</td>
    <td rowspan="2">Designation</td>
    <td rowspan="2">Teaching experience (No. of years)</td>
    <td rowspan="2">Membership in Professional Organization</td>
    </tr>
    <tr style="height: 118.075px;">
    <td>Last Name</td>
    <td>First Name</td>
    <td>Middle Initial</td>
    <td>Doctorate Degree</td>
    <td>Master&rsquo;s Degree</td>
    <td>Baccalaureate Degree</td>
    <td>Specialization</td>
    <td>Enrollment Status (Enrolled or Not enrolled)</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 28.525px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    </div>
    <div class="faculty-footer">&nbsp;</div>
    </div>
    </div>
    <p><div class="break"></div><div class="break"></div></p>`;
    editor.insertContent(newPage);
  }

  insertNewTeachingPage(editor: any): void {
    const newPage = `<div class="whole-page-with-table">
  <div class="teaching-content">
    <div class="teaching-header">
      <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;">
        <img src="assets/img/CCS.png">
      </div>
      <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
      <p style="line-height: 1.1; text-align: center;">
        <span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br>
        <span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span>
        <span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span>
        <span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span>
      </p>
      <p style="line-height: 1.1; text-align: center;"><br><strong>
        <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">
          Teaching and Learning Monitoring Form -2
        </span></strong>
      </p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">
        <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">
          Teaching: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College/Department:
        </span>
      </p>
      <p class="MsoNormal" style="text-align: left;" align="center">
        <strong>
          <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </span>
        </strong>
        <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">
          Date Covered:
        </span>
        <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date Submitted:
        </span>
      </p>
    </div>
    <div align="center"></div>
    <div class="teaching-content-body">
      <table class="MsoTableGrid">
        <thead>
          <tr>
            <th rowspan="3">No.</th>
            <th rowspan="3">Courses Handled /<br>Year & Section</th>
            <th rowspan="3">Module Number</th>
            <th colspan="4">Synchronous</th>
            <th colspan="3">Asynchronous</th>
          </tr>
          <tr>
            <th colspan="4">Virtual</th>
            <th rowspan="2">Platform</th>
            <th rowspan="2">Schedule of Consultations</th>
            <th rowspan="2">Activities</th>
          </tr>
          <tr>
            <th>Platform</th>
            <th>Schedule of Meeting</th>
            <th>Meeting ID / Password / Class Password</th>
            <th>Activities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>BSEMC1A & 1B</td>
            <td>1 - 3</td>
            <td>Google Meet</td>
            <td valign="top">M.T.<br>2:30 – 3:30 P.M.</td>
            <td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
            <td>Module</td>
            <td>Google Meet /LAMP</td>
            <td>Google Meet /LAMP</td>
            <td>Activities</td>
          </tr>
          <tr>
            <td>1</td>
            <td>BSEMC1A & 1B</td>
            <td>1 - 3</td>
            <td>Google Meet</td>
            <td valign="top">M.T.<br>2:30 – 3:30 P.M.</td>
            <td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
            <td>Module</td>
            <td>Google Meet /LAMP</td>
            <td>Google Meet /LAMP</td>
            <td>Activities</td>
          </tr>
          <tr>
            <td>1</td>
            <td>BSEMC1A & 1B</td>
            <td>1 - 3</td>
            <td>Google Meet</td>
            <td valign="top">M.T.<br>2:30 – 3:30 P.M.</td>
            <td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
            <td>Module</td>
            <td>Google Meet /LAMP</td>
            <td>Google Meet /LAMP</td>
            <td>Activities</td>
          </tr>
          <tr>
            <td>1</td>
            <td>BSEMC1A & 1B</td>
            <td>1 - 3</td>
            <td>Google Meet</td>
            <td valign="top">M.T.<br>2:30 – 3:30 P.M.</td>
            <td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
            <td>Module</td>
            <td>Google Meet /LAMP</td>
            <td>Google Meet /LAMP</td>
            <td>Activities</td>
          </tr>
          <tr>
            <td>1</td>
            <td>BSEMC1A & 1B</td>
            <td>1 - 3</td>
            <td>Google Meet</td>
            <td valign="top">M.T.<br>2:30 – 3:30 P.M.</td>
            <td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
            <td>Module</td>
            <td>Google Meet /LAMP</td>
            <td>Google Meet /LAMP</td>
            <td>Activities</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`;
    editor.insertContent(newPage);
  }

  insertNewFacultySchedPage(editor: any): void {
    const newPage = `
    <div class="whole-page">
    <div class="facultysched-content">
    <div class="facultysched-header">
      <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><span style="font-family: arial, helvetica, sans-serif;"><img src="../../../../../assets/img/CCS.png"></span></div>
      <p class="gc-logo"><span style="font-family: arial, helvetica, sans-serif;"><img style="float: left;" src="../../../../../assets/img/GC.png"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt; font-family: arial, helvetica, sans-serif;">Republic of the Philippines&nbsp;</span><br><span style="font-family: arial, helvetica, sans-serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 12pt;">INDIVIDUAL FACULTY LOAD AND SCHEDULE</span></strong> </span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 9.0pt; color: black; mso-bidi-font-style: italic;">Semester: 1st, Academic Year: <u>2022 - 2023</u></span></strong> </span></p>
          </div>
        <div class="facultysched-content-body">
      <p style="line-height: 0.5; text-align: center;">&nbsp;</p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Name of Professor/Instructor:&nbsp;<strong>NAME</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Field of Specialization: <strong>Computer Science</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Highest Educational Qualification: <strong>BACHELOR OF SCIENCE IN COMPUTER SCIENCE</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Academic Rank:&nbsp;<strong>INSTRUCTOR II&nbsp; &nbsp;</strong>Status:&nbsp; X&nbsp; Full-Time(COS)&nbsp; Part-Time(COS)&nbsp; Regular</span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">College/Department:&nbsp;<strong>College of Computer Studies</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Consultation Hours for Students:&nbsp;<strong>MT&nbsp;</strong>(7:00 A.M. - 10:00 A.M.);&nbsp;<strong>Wednesday&nbsp;</strong>(7:00 A.M. - 10:00 A.M.);</span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Official Time In and Out: <span lang="EN-US" style="font-size: 9pt; color: black;">MT (7:00 A.M. &ndash; 7:00 P.M.); W (7:00 A.M.&ndash; 8:00 P.M.); Th (7:00 A.M.&ndash; 7:00 P.M.); </span></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;"><span lang="EN-US" style="font-size: 9pt; color: black;">Fri (7:00 P.M. - 5:00 P.M.);</span></span></p>
      <p><span lang="EN-US" style="font-size: 9.0pt; color: black; mso-bidi-font-style: italic;"><span lang="EN-US" style="font-size: 9pt; color: black;">Regular Teaching Load:</span></span></p>
      <table style="border-collapse: collapse; width: 100%; height: 159.738px;" border="1"><colgroup><col style="width: 8.74427%;"><col style="width: 8.31422%;"><col style="width: 25.2294%;"><col style="width: 5.44725%;"><col style="width: 15.9117%;"><col style="width: 7.31078%;"><col style="width: 6.59404%;"><col style="width: 12.1846%;"><col style="width: 10.1778%;"></colgroup>
      <tbody>
      <tr style="height: 65.6125px;">
      <td style="text-align: center;"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Class Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Title</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Day</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Time</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Room</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Units</span></strong></td>
      <td style="text-align: center; line-height: 1;"><strong><span style="font-size: 10pt;"><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">Hours (for Lab. /Duties</span></span></strong></td>
      <td style="text-align: center;"><span style="font-size: 10pt;"><strong><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">No. of Students</span></strong></span></td>
      </tr>
      <tr style="height: 36px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33108</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CSP225L</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Human Computer Interaction (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">M</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">10:00 A.M. &ndash; 1:00 P.M.</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/518</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr style="height: 46.125px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;33210</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">EMC224&nbsp;</span></td>
      <td style="text-align: center; line-height: 1;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Introduction to Human Computer Interaction&nbsp;</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">M&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1:00 P.M. - 4:00 P.M.&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/410&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3&nbsp;</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr style="height: 12px;">
      <td style="text-align: right;" colspan="9"><strong><span style="font-size: 8pt;">Total Number of Units/Hours of Lab./Duties: 4/6&nbsp;</span></strong></td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-top: 3.95pt; text-align: center; line-height: 1;" align="center">&nbsp;</p>
      <p class="MsoNormal" style="margin-top: 3.0pt; mso-pagination: none; tab-stops: 0cm center 240.0pt left 396.0pt 423.0pt; mso-layout-grid-align: none; text-autospace: none;"><strong><span lang="EN-US" style="font-size: 9.0pt; font-family: 'Arial',sans-serif; color: black;">Excess Teaching Load </span></strong><em style="mso-bidi-font-style: normal;"><span lang="EN-US" style="font-size: 9.0pt; font-family: 'Arial',sans-serif; color: black; mso-bidi-font-weight: bold;">(For Regular Faculty Members and Employees only)</span></em></p>
      <table style="border-collapse: collapse; width: 100%; height: 94.925px;" border="1"><colgroup><col style="width: 8.88761%;"><col style="width: 8.45757%;"><col style="width: 25.2294%;"><col style="width: 5.44725%;"><col style="width: 15.7683%;"><col style="width: 7.16743%;"><col style="width: 6.59404%;"><col style="width: 12.1846%;"><col style="width: 10.3211%;"></colgroup>
      <tbody>
      <tr style="height: 58.925px;">
      <td style="text-align: center;"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Class Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Title</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Day</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Time</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Room</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Units</span></strong></td>
      <td style="text-align: center; line-height: 1;"><strong><span style="font-size: 10pt;"><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">Hours (for Lab. /Duties</span></span></strong></td>
      <td style="text-align: center;"><span style="font-size: 10pt;"><strong><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">No. of Students</span></strong></span></td>
      </tr>
      <tr style="height: 36px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33157</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CSP225L</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Human Computer Interaction (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">T</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1:00 P.M. &ndash; 4:00 P.M.</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/520</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33088</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CTS1223L</span></td>
      <td style="text-align: center; line-height: 1;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Usability, HCI. UI Design (Web Design) (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">Wed</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">10:00 A.M. - 1:00 P.M,</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/519</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr>
      <td style="text-align: right;" colspan="9"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><strong><span style="font-size: 8pt;">Total Number of Units/Hours of Lab./Duties: 2/6</span></strong></span></td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-left: 2cm; line-height: 1; text-align: left;">&nbsp;</p>
      <table style="border-collapse: collapse; width: 40.4624%; height: 170px;" border="1"><colgroup><col style="width: 59.122%;"><col style="width: 41.1646%;"></colgroup>
      <tbody>
      <tr style="height: 36px;">
      <td style="text-align: center;" colspan="2">Summary of Academic Load</td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Teaching Load</span></td>
      <td><span style="font-size: 8pt;">13 units/21 hours</span></td>
      </tr>
      <tr style="height: 26px;">
      <td><span style="font-size: 8pt;">Total Regular Load</span></td>
      <td><span style="font-size: 8pt;">13 units/21 hours</span></td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Excess Teaching Load</span></td>
      <td><span style="font-size: 8pt;">5 units/11 hours</span></td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Total Number of Preparations</span></td>
      <td><span style="font-size: 8pt;">3</span></td>
      </tr>
      </tbody>
      </table>
      <p><strong>EFFECTIVE DATE:&nbsp;</strong><span style="text-decoration: underline;">June 12, 2024</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>NAME</strong></span></p>
      <p><span style="font-size: 8pt;"><strong>Noted:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Verified:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Recommending approval:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Approved:</strong></span></p>
      <p style="line-height: 1;"><span style="text-decoration: underline;"><span style="font-size: 10pt;"><strong>KENNETH V. BAUTISTA</strong></span></span><span style="font-size: 10pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="text-decoration: underline;">ROWEL Y. CASTILLO</span></strong>&nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>DARWIN P. PAGUIO, PhD</strong></span><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Prof. ARLIDA M. PAME<span style="text-decoration: underline;"><br></span></strong><em>BSCS Program Coordinator</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>Registrar</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>VP for Academic Affairs&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College President</em></span><span style="text-decoration: underline;"><span style="font-size: 10pt;"><strong><br style="text-decoration: underline;"></strong></span></span></p>
      <p><span style="font-size: 10pt;"><span style="text-decoration: underline;"><strong>ERLINDA C. ABARINTOS, DIT</strong></span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>IMELDA DP. SORIANO, EdD</strong><strong><br></strong></span><em>Dean&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College Administrator</em></span><br><span style="font-size: 10pt;"><em>VP for Adminsitration &amp; Finance</em></span></p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p style="line-height: 0.5; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      </div>
      <div class="facultysched-footer"></div>
      </div>
      </div>
      <div class="break"></div>
    `;
    editor.insertContent(newPage);
  }

  insertNewEventReportPage(editor: any): void {
    const newPage = `<div class="whole-page">
<div class="event-content">
<div class="event-header">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
<p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Event Report</span></strong></p>
</div>
<div class="event-content-body">
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Faculty:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College/Department:</span></span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"> &nbsp;Date Covered:</span></span><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date Submitted:</span></span></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Brief overview of the event:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Objectives and goals:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Event planning process:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Team members involved:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Budget and resources:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Description of the event activities:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Number of attendees:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Key speakers or guests:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Goals met:</span></strong></p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Feedback from attendees:</span></strong></p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Positive impacts:</span></strong></p>
<p>&nbsp;</p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Issues encountered:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Lessons learned:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Suggestions for future events:</strong></span></p>
</div>
<div class="event-footer">&nbsp;</div>
</div>
<div class="break"></div>
<div class="event-content">
<div class="event-header">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
</div>
<div class="event-content-body">
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Budget overview:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Actual expenditures:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Sponsorship and donations:</strong></span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Overall assessment of the event:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Recommendations for future events:</strong></span></p>
<div class="collage-wrapper" style="width: 700px; resize: both; overflow: hidden;">
<div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
<div class="image-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #000;">
<div class="image-placeholder" style="height: 300px; background-color: #ccc;">&nbsp;</div>
</div>
<div class="image-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #000;">
<div class="image-placeholder" style="height: 300px; background-color: #ccc;">&nbsp;</div>
</div>
</div>
<div class="text-box" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;" contenteditable="true">CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.</div>
&nbsp;</div>
</div>
<div class="event-footer">&nbsp;</div>
</div>
</div>
<p><div class="break"></div></p>`;
    editor.insertContent(newPage);
  }
  
  insertNewFinancialReportPage(editor: any): void {
    const newPage = `
    <div class="whole-page">
    <div class="financial-content">
    <div class="financial-header">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Financial Report</span></strong></p>
    </div>
        <div class="financial-content-body">
    <p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Name of Organization:</span></strong></p>
    <p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;School Year:&nbsp;</span></strong></p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Source Funds</span></strong></p>
    <p style="line-height: 1.1; text-align: left;"><em><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Example</span></em></p>
    <p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Remaining fund (SY 2023-2024)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php</span></p>
    <p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Collected Membership Fee&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php</span></p>
    <p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Income Generating Projects&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Php</span></p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Total fund:</span></strong></p>
    <p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Summary of Expenses</span></strong></p>
    <table style="border-collapse: collapse; width: 100%; height: 180.859px;" border="1"><colgroup><col style="width: 20.0173%;"><col style="width: 20.0173%;"><col style="width: 20.0173%;"><col style="width: 12.567%;"><col style="width: 27.381%;"></colgroup>
    <tbody>
    <tr style="height: 36.1719px;">
    <td style="text-align: center;">Activity &amp; Date</td>
    <td style="text-align: center;">Item</td>
    <td style="text-align: center;">Amount per Unit</td>
    <td style="text-align: center;">Quantity</td>
    <td style="text-align: center;">Total</td>
    </tr>
    <tr style="height: 36.1719px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 36.1719px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 36.1719px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr style="height: 36.1719px;">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 72.5108%;"><col style="width: 27.4892%;"></colgroup>
    <tbody>
    <tr>
    <td style="text-align: left; padding-left: 240px;"><span style="font-family: 'times new roman', times, serif;">TOTAL EXPENSES</span></td>
    <td style="text-align: left; padding-left: 240px;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <p><span style="font-family: 'times new roman', times, serif;">Total Fund</span></p>
    <p style="padding-left: 40px;"><span style="font-family: 'times new roman', times, serif;">-<em>(less)</em></span></p>
    <p><span style="font-family: 'times new roman', times, serif;">Total expenses <span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></p>
    <p><span style="font-family: 'times new roman', times, serif;">Cash on Hand <span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span></p>
    <p><span style="font-family: 'times new roman', times, serif;">Prepared by:</span></p>
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">
    </div>
    <div class="financial-footer"></div>
    
    </div>
    <div class="break"></div>
    <div class="financial-content">
    <div class="financial-header">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
    </div>
        <div class="financial-content-body">
    <p style="line-height: 1;">&nbsp;</p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the Treasurer</span></span></span></span></span></span></span></span></p>
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Audited by:</span></span></span></p>
    <p>&nbsp;</p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the Auditor&nbsp;</span></span></span></span></span></span></span></span></p>
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Noted by:</span></span></span></p>
    <p>&nbsp;</p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
    <p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the President&nbsp;</span></span></span></span></span></span></span></span></p>
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Approved:</span></span></span></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;"></span></span></span></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    </div>
    <div class="financial-footer"></div>
    </div>
    </div>
    <div class="break"></div>`;
    editor.insertContent(newPage);
  }

  insertNewSummaryReportPage(editor: any): void {
    const newPage = `<div class="whole-page-with-table">
<div class="summary-content">
<div class="summary-header">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
<p style="line-height: 1.1; text-align: center;"><br><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">SUMMARY OF ACCOMPLISHMENTS AND ACTIVITIES</span></strong></p>
<p style="line-height: 1.1; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">FOR 1<sup>st</sup> Semester A.Y. 2023 - 2024</span></strong></p>
<p style="line-height: 1.1; text-align: center;">&nbsp;</p>
</div>
<div class="summary-content-body">
<p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of Student Organization<span style="mso-tab-count: 1;">&nbsp; &nbsp;</span>:</span></strong></p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of President<span style="mso-tab-count: 3;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>:&nbsp;</span></strong></p>
<table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 791.387px; width: 741px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 93px;">
<td style="width: 163.05px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activities Undertaken</span></strong></p>
</td>
<td style="width: 172.55px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Dates and Places / Platform</span></strong></p>
</td>
<td style="width: 189.1px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activity Main Objective</span></strong></p>
</td>
<td style="width: 154.7px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Remarks</span></strong></p>
</td>
</tr>
<tr style="height: 174px;">
<td style="width: 163.05px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 172.55px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 189.1px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 154.7px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 161px;">
<td style="width: 163.05px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 172.55px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 189.1px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 154.7px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 177px;">
<td style="width: 163.05px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 172.55px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 189.1px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 154.7px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 186.387px;">
<td style="width: 163.05px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 172.55px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 189.1px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 154.7px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p class="MsoNormal" style="padding-left: 40px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">What were the problems encountered by the officers of the Student Organization in conducting activities?</span></strong></p>
<p class="MsoNormal" style="padding-left: 80px;">&nbsp;</p>
<p class="MsoNormal" style="padding-left: 80px;">&nbsp;</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;"> </span></strong></p>
</div>
<div class="summary-footer">&nbsp;</div>
</div>
<strong style="mso-bidi-font-weight: normal;"> </strong></div>
<p><strong style="mso-bidi-font-weight: normal;"> <div class="break"></div></strong></p>
<div class="whole-page-with-table">
<div class="summary-content">
<div class="summary-header">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
</div>
<div class="summary-content-body">
<p style="line-height: 1.1; text-align: center;">&nbsp;</p>
<table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 334.363px; width: 736px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 161.762px;">
<td style="width: 161.8px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 171.3px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 187.85px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 153.45px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 172.6px;">
<td style="width: 161.8px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 171.3px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 187.85px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 153.45px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 36pt; text-align: center;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">&nbsp;</span></p>
<p class="MsoNormal" style="padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Prepared by: </span></strong></p>
<p class="MsoNormal" style="line-height: normal; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></strong></p>
<p class="MsoNormal" style="text-indent: 36pt; line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><u><span style="mso-spacerun: yes;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></u></span></strong></p>
<p class="MsoNormal" style="text-indent: 36pt; line-height: normal; margin: 0cm 0cm 0.0001pt 72pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Secretary</span></strong></p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 36pt; line-height: normal; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></strong></p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 36pt; line-height: normal; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></strong></p>
<p class="MsoNormal" style="text-indent: 36pt; line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-spacerun: yes;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></span></strong></p>
<p class="MsoNormal" style="text-indent: 36pt; line-height: normal; margin: 0cm 0cm 0.0001pt 72pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">President</span></strong></p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 36pt; line-height: normal; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></strong></p>
<p class="MsoNormal" style="padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Noted by:</span></strong></p>
<p class="MsoNormal" style="padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></strong></p>
<p class="MsoNormal" style="text-indent: 36pt; line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-tab-count: 4;"><span style="text-decoration: underline;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong></span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="mso-spacerun: yes;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span><span style="mso-tab-count: 1;">&nbsp; &nbsp; &nbsp;&nbsp;</span></span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Organization/Council Adviser<span style="mso-tab-count: 3;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="mso-tab-count: 1;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Date</span></strong></p>
</div>
<div class="summary-footer">&nbsp;</div>
</div>
</div>
<p><strong style="mso-bidi-font-weight: normal;"><div class="break"></div></strong></p>`;
    editor.insertContent(newPage);
  }

  insertNewSyllabusReportPage(editor: any): void {
    const newPage = `<div class="whole-page">
<div class="syllabus-content">
<div class="syllabus-header">
<p class="ccs-logo"><span style="font-family: arial, helvetica, sans-serif;"><img style="font-size: 10.6667px; font-weight: bold; text-align: center; float: left;" src="assets/img/CCS.png"></span></p>
<p class="gc-logo" style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt; font-family: arial, helvetica, sans-serif;">Republic of the Philippines <img style="float: right;" src="assets/img/GC.png"></span><br><span style="font-family: arial, helvetica, sans-serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></span></p>
<p class="gc-logo" style="line-height: 1.1; text-align: center;">&nbsp;</p>
<hr>
<h1 style="line-height: 1.1; text-align: center;"><span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;"><strong>SYLLABUS</strong></span></h1>
</div>
        <div class="syllabus-content-body">
<h6 style="text-align: left; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;"><strong>COURSE NUMBER&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </strong>&nbsp; : CSP22112</span></span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE DESCRIPTION&nbsp; &nbsp;</strong>: COMPUTER PROGRAMMING</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE PROFESSOR&nbsp; &nbsp; &nbsp;: </strong>Name</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE CREDIT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : </strong>4 units</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>TIME DURATION&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong> &nbsp;: 3 Hours a Day</span></h6>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">A. COURSE DESCRIPTION:</span></strong></span></h6>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;scrambled it to make a type specimen book.</span></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">B. COURSE OBJECTIVES:</span></strong></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets&nbsp; containing Lorem Ipsum&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">C. LEARNING COMPETENCIES:</span></strong></span></p>
<ol>
<li style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span></span></span></li>
<li style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-size: 10pt;">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like&nbsp; Aldus PageMaker including versions of Lorem Ipsum.</span></span></span></span></span></li>
</ol>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">D. COURSE MODULE</span></strong></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp;Module 1: Introduction to Computer Programming</span></strong></span></p>
<ul>
<li style="font-family: arial, helvetica, sans-serif; text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">&nbsp;</span></strong><span style="font-size: 10pt;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></span></li>
</ul>
<p>&nbsp;</p>
</div>
<div class="syllabus-footer"></div>
</div>
</div>
<div class="break"></div>`;
    editor.insertContent(newPage);
  }

  insertCollage(editor: Editor, count: number): void {
    const collageTemplate = `
      <div class="collage-wrapper" style="width: 600px; height: auto; resize: both; overflow: hidden; margin: 0 auto; cursor: move;" draggable="true">
        <div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
          ${Array.from({ length: count }).map(() => `
            <div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden;">
              <div class="image-placeholder" style="height: 100px; background-color: #ccc;"></div>
            </div>
          `).join('')}
        </div>
        <div class="text-box" contenteditable="true" style="flex: 1; min-height: 50px; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;">
          CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.
        </div>
      </div>
    `;
    editor.insertContent(collageTemplate);
    this.setupDragAndDrop(editor);
  }
  
  insertImgContainer(editor: Editor) {
    const imgContainer = `
      <div class="img-wrapper" style="width: 600px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: hidden; cursor: move;" draggable="true">
        <div class="image-container" style="width: 100%; margin-bottom: 20px; overflow: hidden;">
          <div class="image-placeholder" style="height: 200px; background-color: #ccc;"></div>
        </div>
        <div class="text-box" contenteditable="true" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;">
          CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.
        </div>
      </div>
    `;
    editor.insertContent(imgContainer);
    this.setupDragAndDrop(editor);
  }
  
  insertHeader(editor: any) {
    const headerHTML = `<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong></p>`;
    editor.insertContent(headerHTML);
    this.setupDragAndDrop(editor);
  }
  
  
  

  private startPolling(): void {
    this.pollingSubscription = interval(this.POLLING_INTERVAL).pipe(
      switchMap(() => this.sentenceService.getTexts())
    ).subscribe(
      (response) => {
        this.sentences = response.data.sentences || [];
        this.initializeSentenceButtons(this.sentences);
      },
      (error) => {
        console.error('Error loading sentences:', error);
      }
    );
  }

  private stopPolling(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
  

  initializeSentenceButtons(sentences: any[]) {
    const editor = this.editor; // Ensure this.editor is correctly initialized
  
    editor.ui.registry.addMenuButton('insertSentence', {
      text: 'Insert Sentence',
      fetch: (callback: any) => {
        const items = sentences.map((sentence: any) => ({
          type: 'menuitem',
          text: sentence.text,
          onAction: () => {
            console.log('Menu item clicked:', sentence.text); // Debugging line
            this.insertSentence(editor, sentence.text);
          }
        }));
        callback(items);
      }
    });
  
    editor.ui.registry.addButton('manageSentences', {
      text: 'Manage Sentences',
      onAction: () => this.openManageSentencesDialog()
    });
  }
  

  insertSentence(editor: any, sentence: string) {
    // Get current selection
    const selection = editor.selection.getNode();
    
    // Log current selection
    console.log('Selected node before insertion:', selection);
    
    // Insert the sentence at the cursor position
    editor.execCommand('mceInsertContent', false, sentence);
    
    // Log the content after insertion
    console.log('Content after insertion:', editor.getContent());
  }



  openManageSentencesDialog() {
    const dialogRef = this.dialog.open(ManageTextComponent, {
      width: '500px',
      data: { sentences: this.sentences }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.startPolling(); // Refresh the list of sentences
      }
    });
  }

  setupDragAndDrop(editor: any) {
    console.log('Initializing drag and drop...');
  
    let draggingElement: HTMLElement | null = null;
    let offsetX: number = 0;
    let offsetY: number = 0;
  
    // Function to set draggable attributes
    const setDraggableAttributes = () => {
      const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
  
      if (iframe) {
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
          const elements = iframeDoc.querySelectorAll('.img-wrapper, .collage-wrapper, .teaching-header');
          elements.forEach(element => {
            (element as HTMLElement).draggable = true;
          });
        } else {
          console.error('Iframe document not found');
        }
      } else {
        console.error('Iframe not found');
      }
    };
  
    // Initial setup for draggable attributes
    setDraggableAttributes();
  
    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      setDraggableAttributes(); // Apply draggable attributes to newly added elements
    });
  
    const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
    if (iframe) {
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        observer.observe(iframeDoc.body, { childList: true, subtree: true });
      }
    }
  
    // Handle drag start
    editor.on('dragstart', (event: DragEvent) => {
      console.log('Drag start event triggered');
      const targetElement = event.target as HTMLElement;
      const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
  
      if (iframe) {
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc && targetElement) {
          if (targetElement.classList.contains('img-wrapper') || 
              targetElement.classList.contains('collage-wrapper') ||
              targetElement.classList.contains('teaching-header')) {
            draggingElement = targetElement;
            const rect = targetElement.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
            console.log(`Drag started at X: ${event.clientX}, Y: ${event.clientY}`);
          }
        }
      }
    });
  
    // Handle drag over
    editor.on('dragover', (event: DragEvent) => {
      event.preventDefault(); // Required to allow drop
      console.log(`Drag over at X: ${event.clientX}, Y: ${event.clientY}`);
    });
  
    // Handle drop
    editor.on('drop', (event: DragEvent) => {
      event.preventDefault();
      console.log('Drop event triggered');
  
      if (draggingElement) {
        const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
        if (iframe) {
          const iframeDoc = iframe.contentDocument;
          if (iframeDoc) {
            const wholePageContainer = iframeDoc.querySelector('.whole-page') as HTMLElement;
            if (wholePageContainer) {
              const rect = wholePageContainer.getBoundingClientRect();
              const dropX = event.clientX - rect.left - offsetX;
              const dropY = event.clientY - rect.top - offsetY;
  
              console.log(`Dropped at X: ${dropX}, Y: ${dropY}`);
  
              draggingElement.style.position = 'absolute';
              draggingElement.style.left = `${dropX}px`;
              draggingElement.style.top = `${dropY}px`;
  
              // Ensure the element is appended to the right container
              if (!wholePageContainer.contains(draggingElement)) {
                wholePageContainer.appendChild(draggingElement);
              }
              
              draggingElement = null;
            } else {
              console.error('.whole-page not found within iframe');
            }
          }
        }
      }
    });
  
    // Handle mouse down for dragging
    document.addEventListener('mousedown', (event: MouseEvent) => {
      console.log('Mouse down event triggered');
      const targetElement = event.target as HTMLElement;
      if (targetElement && (
        targetElement.classList.contains('img-wrapper') ||
        targetElement.classList.contains('collage-wrapper') ||
        targetElement.classList.contains('teaching-header')
      )) {
        draggingElement = targetElement;
        const rect = targetElement.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        console.log(`Mouse down at X: ${event.clientX}, Y: ${event.clientY}`);
      }
    });
  
    // Handle mouse move for dragging
    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (draggingElement) {
        event.preventDefault();
        const moveX = event.clientX - offsetX;
        const moveY = event.clientY - offsetY;
  
        draggingElement.style.position = 'absolute';
        draggingElement.style.left = `${moveX}px`;
        draggingElement.style.top = `${moveY}px`;
        console.log(`Mouse move at X: ${moveX}, Y: ${moveY}`);
      }
    });
  
    // Handle mouse up to stop dragging
    document.addEventListener('mouseup', () => {
      draggingElement = null;
      console.log('Mouse up, dragging stopped');
    });
  }
  
  
  
  
  
}




