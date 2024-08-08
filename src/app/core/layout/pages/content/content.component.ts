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
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 950px;
          height: auto;
          position: relative;
          min-height: 1123px;
          padding-left: 4rem;
          padding-right: 4rem;
        }

        .faculty-table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        th, td {
          border: 1px solid #000;
          padding: 5px;
          text-align: center;
          font-size: 8pt;
          word-wrap: break-word;
          white-space: normal;
        }

        th[colspan], td[colspan] {
          text-align: center;
        }

        .ccs-logo img, .gc-logo img {
          max-width: 100px;
          height: auto;
        }

        .text-blue-500 {
          color: blue;
          text-decoration: underline;
        }

        .content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .faculty-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .teaching-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .facultysched-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .event-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .financial-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .summary-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .syllabus-content-body {
          margin: 0 auto;
          padding: 0 2rem;
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

      /* Print styles */
      @media print {
        @page {
          size: auto;
          margin: 0;
        }

        body {
          background-color: #fff;
          overflow: hidden;
          width: 840px;
          display: flex;
          margin: 0 auto;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .faculty-table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        th, td {
          border: 1px solid #000;
          padding: 5px;
          text-align: center;
          font-size: 8pt;
          word-wrap: break-word;
          white-space: normal;
        }

        th[colspan], td[colspan] {
          text-align: center;
        }

        .ccs-logo img, .gc-logo img {
          max-width: 100px;
          height: auto;
        }

        .text-blue-500 {
          color: blue;
          text-decoration: underline;
        }


        .content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .faculty-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .teaching-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .facultysched-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .event-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .financial-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .summary-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .syllabus-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
        }

        .collage-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          border: 1px solid #000;
          padding: 10px;
          cursor: move;
          margin: 0 auto;
          resize: none;
        }

        .img-wrapper {
          cursor: move;
          gap: 10px;
          flex-wrap: wrap;
          padding: 10px;
          display: inline-block;
          margin: 0 auto;
          resize: none;
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

        .footer {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          display: block;
        }

        .delete-btn {
          display: none;
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
        this.setupDeleteFunctionality(editor)
        this.makeImagesDraggable(editor)
        this.applyHeaderStyling(editor)
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
          <div class="content">
            <div class="content-body">
              ${content}
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
          <div class="content">
            <div class="content-body">
              ${content}
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

  makeImagesDraggable(editor: Editor): void {
    const images = editor.getBody().querySelectorAll('img');
  
    images.forEach((img: HTMLImageElement) => {
      img.setAttribute('draggable', 'true');
    });
  
    this.setupDragAndDrop(editor);
  }
  
  insertCollage(editor: Editor, count: number): void {
    const collageTemplate = `
      <div class="collage-wrapper" style="width: 400px; height: auto; resize: both; overflow: hidden; margin: 0 auto; cursor: move; position: relative;" draggable="true">
        <button class="delete-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0); color: black; border: 2px solid black; border-radius: 5px; padding: 0.5rem 1rem; cursor: pointer; z-index: 1000;">Delete</button>
        <div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
          ${Array.from({ length: count }).map((_, index) => `
            <div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden; position: relative;">
              <div class="image-placeholder" style="height: 100px; background-color: #ccc;"></div>
              <figcaption class="figure-caption" contenteditable="true" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.5); color: white; padding: 5px; text-align: center;">
                Figure ${index + 1}
              </figcaption>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
    editor.insertContent(collageTemplate);
    this.setupDragAndDrop(editor);
    this.setupDeleteFunctionality(editor);
  }

  insertImgContainer(editor: Editor): void {
  const imgContainer = `
    <div class="img-wrapper" style="width: 200px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: hidden; cursor: move; position: relative;" draggable="true">
      <button class="delete-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0); color: black; border: 2px solid black; border-radius: 5px; padding: 0.5rem 1rem; cursor: pointer; z-index: 1000;">Delete</button>
      <div class="image-container" style="width: 100%; margin-bottom: 20px; overflow: hidden;">
        <div class="image-placeholder" style="height: 200px; background-color: #ccc;"></div>
          <figcaption class="figure-caption" contenteditable="true" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.5); color: white; padding: 5px; text-align: center;">
            Figure 1
          </figcaption>
        </div>
      </div>
    </div>  
  `;
  editor.insertContent(imgContainer);
  this.setupDragAndDrop(editor);
  this.setupDeleteFunctionality(editor);
}
insertHeader(editor: any) {
  const headerHTML = `
    <div class="teaching-header" style="
      width: 90%; 
      margin: 0 auto; /* Center align */
      padding: 0; 
      border: 0; 
      box-sizing: border-box; 
      cursor: move; 
      position: absolute; 
      top: 0; 
      left: 50%; 
      transform: translateX(-50%);
    " draggable="true">
      <div class="ccs-logo" style="
        float: right; 
        margin-right: 10px; 
        border-radius: 50px;
      ">
        <img style="width: 105px; height: 117px;" src="assets/img/CCS.png">
      </div>
      <p class="gc-logo" style="
        float: left; 
        width: 96px; 
        height: 96px;
      ">
        <img style="width: 96px; height: 96px;" src="assets/img/GC.png">
      </p>
      <p style="
        line-height: 1.1; 
        text-align: center; 
        margin: 0;
      ">
        <span style="font-size: 12pt;">
          Republic of the Philippines&nbsp;<br>
          Office Of The Vice President For Academic Affairs
          <span style="font-weight: bold;"><br></span>
          City of Olongapo
          <span style="font-weight: bold;"><br></span>
          &nbsp;Gordon College
        </span>
      </p>
      <p style="
        line-height: 1.1; 
        text-align: center; 
        margin: 0;
      ">
        <br>
        <strong>
          <span lang="EN-US" style="
            font-size: 12.0pt; 
            line-height: 107%; 
            font-family: 'Times New Roman', serif;
          ">&nbsp;</span>
        </strong>
      </p>
    </div>
  `;

  editor.insertContent(headerHTML);

  this.setupDragAndDrop(editor);

  this.applyHeaderStyling(editor);
}


applyHeaderStyling(editor: any) {
    const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
    if (iframe) {
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
            const header = iframeDoc.querySelector('.teaching-header') as HTMLElement;
            if (header) {
                header.style.position = 'absolute';
                header.style.top = '0';
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
                header.style.width = '90%';
                header.style.margin = '0 auto'; 
            }
        }
    }
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
                const elements = iframeDoc.querySelectorAll('.img-wrapper, .collage-wrapper, .teaching-header, img');
                elements.forEach(element => {
                    (element as HTMLElement).draggable = true;
                });

                // Ensure images inside containers are not draggable
                const images = iframeDoc.querySelectorAll('.img-wrapper img, .collage-wrapper img');
                images.forEach(image => {
                    (image as HTMLElement).draggable = false;
                });
                console.log(elements);
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
                    targetElement.classList.contains('teaching-header') ||
                    targetElement.tagName === 'IMG') {
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
                    const wholePageContainer = iframeDoc.querySelector('.content-body, .faculty-content-body, .teaching-content-body, .facultysched-content-body, .event-content-body, .financial-content-body, .summary-content-body, .syllabus-content-body') as HTMLElement;
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
                        console.error('.content not found within iframe');
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
            targetElement.classList.contains('teaching-header') ||
            targetElement.tagName === 'IMG'
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


  setupDeleteFunctionality(editor: Editor) {
    const deleteButtons = editor.getDoc().querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const container = (button as HTMLElement).closest('.collage-wrapper, .img-wrapper, img');
        if (container) {
          container.remove();
        }
      });
    });
  }
  
}




