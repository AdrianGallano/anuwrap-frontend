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
  editor: any; // Declare editor property

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
        background-color: rgba(0,0,0,0);
        margin: 1rem auto 0;
        min-height: calc(100vh - 1rem);
        padding: 4rem;
        box-sizing: border-box;
      }

      .whole-page {
        background-color: #fff;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 4px rgba(0, 0, 0, .15);
        box-sizing: border-box;
        overflow: auto
      }

      .content {
        margin-left: 2rem;
        margin-right: 2rem;
      }

      .collage-container {
        display: flex;
        flex-wrap: wrap;
        margin: 20px auto;
        gap: 10px;
        border: 1px solid #000;
        padding: 10px;
        cursor: move;
      }

      .img-container {
        cursor: move;
        gap: 10px;
        margin: 20px auto;
        border: 1px solid #000;
        padding: 10px;
      }

      .img-container:hover {
        opacity: 0.5;
      }

      .collage-container:hover {
        opacity: 0.5;
      }

      .collage-container > div, .img-container > div {
        flex: 1 1 calc(33% - 10px);
        overflow: hidden;
        max-height: 2000px;
      }

      .collage-container img, .img-container img {
        width: 100%;
        height: 100%;
      }

      .image-placeholder {
        background-color: #ccc;
        min-height: 300px;
        max-width: 100%;
      }

      .header img,
      .footer img {
        width: 100%;
        display: block;
      }

      .header,
      .footer {
        width: 100%;
        text-align: center; /* Optional: Center align content */
        margin: 0; /* Remove any default margin */
        padding: 0; /* Remove any default padding */
        box-sizing: border-box; /* Ensure padding and border are included in width */
      }

      .footer {
        margin-top: 1rem; /* Optional: Add space between content and footer */
      }

      .gc-logo img{
        width: 128px;
        height: 128px;
      }
      
      .ccs-logo img{
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
    }

    /* Print only the whole-page content */
    body > *:not(.whole-page) {
      display: none;
    }
      .whole-page {
        background-color: #fff;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }

      .content {
        margin-left: 2rem;
        margin-right: 2rem;
      }

      .collage-container {
        display: flex;
        flex-wrap: wrap;
        margin: 20px auto;
        gap: 10px;
        border: 1px solid #000;
        padding: 10px;
        cursor: move;
      }

      .img-container {
        cursor: move;
        gap: 10px;
        margin: 20px auto;
        border: 1px solid #000;
        padding: 10px;
      }

      .img-container:hover {
        opacity: 0.5;
      }

      .collage-container:hover {
        opacity: 0.5;
      }

      .collage-container > div, .img-container > div {
        flex: 1 1 calc(33% - 10px);
        overflow: hidden;
        max-height: 2000px;
      }

      .collage-container img, .img-container img {
        width: 100%;
        height: 100%;
      }

      .image-placeholder {
        background-color: #ccc;
        min-height: 300px;
        max-width: 100%;
      }

      .header img,
      .footer img {
        width: 100%;
        display: block;
      }

      .header,
      .footer {
        width: 100%;
        text-align: center; /* Optional: Center align content */
        margin: 0; /* Remove any default margin */
        padding: 0; /* Remove any default padding */
        box-sizing: border-box; /* Ensure padding and border are included in width */
      }

      .footer {
        margin-top: 1rem; /* Optional: Add space between content and footer */
      }

      .gc-logo img{
        width: 128px;
        height: 128px;
      }
      
      .ccs-logo img{
        width: 130px;
        height: 130px;
      }
    }
  `,
    plugins: 'save anchor autolink autosave charmap code directionality fullscreen image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount',
    toolbar: 'uploadCustomFile | save undo redo | fontfamily fontsize | bold italic underline strikethrough | indent outdent | bullist numlist | alignleft aligncenter alignright alignjustify | blockquote formatselect fontselect fontsizeselect | forecolor backcolor | addPageButton | insertImgContainer | table | insertCollage | insertdatetime preview print | searchreplace | a11ycheck',
    setup: (editor: any) => {
      this.editor = editor;

      editor.ui.registry.addButton('uploadCustomFile', {
        text: 'Open File',
        onAction: () => this.openFilePicker(editor)
      });
      editor.ui.registry.addMenuButton('addPageButton', {
        text: 'Add Page',
        fetch: (callback: any) => {
          const items = [
            { type: 'menuitem', text: 'Accomplishment Report Page', onAction: () => this.insertNewAccomplishmentPage(editor) },
            { type: 'menuitem', text: 'Faculty Matrix Report Page', onAction: () => this.insertNewFacultyPage(editor) },
            { type: 'menuitem', text: 'Teaching And Learning Report Page', onAction: () => this.insertNewTeachingPage(editor) },
            { type: 'menuitem', text: 'Faculty Schedule Report Page', onAction: () => this.insertNewFacultySchedPage(editor) },
            { type: 'menuitem', text: 'Event Report Page', onAction: () => this.insertNewEventReportPage(editor) },
            { type: 'menuitem', text: 'Financial Report Page', onAction: () => this.insertNewFinancialReportPage(editor) },
            { type: 'menuitem', text: 'Summary Of Accomplishment Report Page', onAction: () => this.insertNewSummaryReportPage(editor) }
          ];
          callback(items);
        }
      });

      editor.ui.registry.addMenuButton('insertCollage', {
        text: 'Add Collage',
        fetch: (callback: any) => {
          const items = [
            { type: 'menuitem', text: 'Double', onAction: () => this.insertCollage(editor, 2) },
            { type: 'menuitem', text: 'Triple', onAction: () => this.insertCollage(editor, 3) },
            { type: 'menuitem', text: 'Quadruple', onAction: () => this.insertCollage(editor, 4) },
            { type: 'menuitem', text: 'Quintuple', onAction: () => this.insertCollage(editor, 5) },
            { type: 'menuitem', text: 'Sextuple', onAction: () => this.insertCollage(editor, 6) }
          ];
          callback(items);
        }
      });

      editor.ui.registry.addButton('insertImgContainer', {
        text: 'Add Image',
        onAction: () => this.insertImgContainer(editor)
      });

      editor.on('init', () => this.initializeContent(editor));

      editor.on('dragstart', (event: DragEvent) => {
        const targetElement = event.target as HTMLElement;
        if (targetElement.classList.contains('img-container')) {
          if (event.dataTransfer) {
            event.dataTransfer.setData('text/html', targetElement.outerHTML);
            event.dataTransfer.effectAllowed = 'move';
            // Optionally set a drag image for visual feedback
            const dragImage = new Image();
            dragImage.src = 'path/to/drag-image.png';
            event.dataTransfer.setDragImage(dragImage, 0, 0);
          }
        }
      });
  
      editor.on('dragover', (event: DragEvent) => {
        event.preventDefault();
      });
  
      editor.on('drop', (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer) {
          const droppedHTML = event.dataTransfer.getData('text/html');
          editor.selection.setContent(droppedHTML); // Insert content at current selection
        }
      });
      
      editor.on('dblclick', (event: any) => {
        const target = event.target;
      
        // Get the click position relative to the target element
        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
      
        // Create a hidden text node at the clicked position
        const textNode = editor.dom.create('span', { text: '' });
        editor.dom.setStyles(textNode, {
          position: 'absolute',
          left: `${offsetX}px`,
          top: `${offsetY}px`,
          opacity: '0',
          width: '1px',
          height: '1px',
          fontSize: '1px',
          overflow: 'hidden',
          pointerEvents: 'none',
          margin: '0px'
        });
      
        // Insert the text node at the clicked position
        target.appendChild(textNode);
      
        // Move the cursor to the inserted text node
        editor.selection.setCursorLocation(textNode);
      });
      
      editor.on('keyup', (event: KeyboardEvent) => {
        // Handle keyup events
      });
      editor.on('keydown', (event: KeyboardEvent) => {
        // Handle keydown events
      });
      editor.on('focus', (event: FocusEvent) => {
        // Handle focus events
      });
      editor.on('blur', (event: FocusEvent) => {
        // Handle blur events
      });

      editor.on('NodeChange', () => {
    });
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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
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

  initializeContent(editor: any) {
    this.contentService.getContent(this.contentId).subscribe(
      (response) => {
        editor.setContent(response.data.content.body);
        this.content.report_id = response.data.content.report_id;
        this.content.body = response.data.content.body;
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
    this.updateEditorContent(htmlTable);
  }

  private handleCSV(contents: string): void {
    const lines: string[] = contents.split('\n');
    const csvData = lines.map(line => line.split(','));

    const htmlTable = this.convertExcelToHtmlTable(csvData);
    this.updateEditorContent(htmlTable);
  }

  private handleDoc(contents: ArrayBuffer): void {
    mammoth.convertToHtml({ arrayBuffer: contents }).then(result => {
      this.updateEditorContent(result.value);
    }).catch(error => {
      console.error('Error converting DOCX to HTML:', error);
    });
  }

  private updateEditorContent(content: string): void {
    if (this.editor) {
      const wrappedContent = `
        <div class="whole-page">
          <div class="content">
            ${content}
          </div>
        </div>
      `;
      this.editor.setContent(wrappedContent);
    } else {
      console.error('TinyMCE editor instance is not available.');
    }
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

  saveContent(editor: any): void {
    const contentBody = editor.getContent();
    this.content.body = contentBody;

    this.contentService.editContent(this.content, this.contentId).subscribe(
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
  

  insertNewAccomplishmentPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="header">
      <img src="../../../../../assets/img/header2.jpg" width="1205" height="242">
    </div>
    <div class= "content">
        <p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">BSEMC Accomplishment Comprehensive Narrative Report</span></strong></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Renewal of Institutional Membership for Animation Council of the Philippines (ACPI)</span></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Gordon College &ndash; College of Computer Studies renewed it&rsquo;s academic membership with Animation Council of the Philippines (ACPI). This renewal signifies our unwavering commitment in the field of animation and our dedication to supporting the initiatives of ACPI. Our institution has long recognized the vital role played by ACPI in advancing and promoting the field of animation in the Philippines. Since our initial membership commencement on September 2021, our active involvement in ACPI has been a source of pride. Renewing our membership was a natural choice to maintain our contributions to the growth and development of our BSEMC students in the field of animation.</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">The renewal of our institutional membership with the Animation Council of the Philippines is a testament to our enduring commitment to the growth and excellence our BSEMC Students in the field of animation. We eagerly anticipate continuing our active involvement, collaborating with fellow members and academic institutions, and contributing to ACPI's mission to further enhance the country's animation landscape.</span></p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        </div>
    <div class="footer">
      <img src="../../../../../assets/img/footer2.jpg" width="1201" height="166">
      <div class="break"></div>
    </div>
    </div>
  `;
    editor.insertContent(newPage);
  }

  insertNewFacultyPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
      <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png"></div>
      <p class="gc-logo"><span style="font-size: 12pt;"><img style="float: left;" src="../../../../../assets/img/GC.png"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
      <p style="line-height: 1.1; text-align: center;"><strong>FACULTY MATRIX</strong><br>2nd Semester A.Y. 2023-2024</p>
      <table style="border-collapse: collapse; width: 94.4948%; height: 329.222px;" border="1"><colgroup><col style="width: 4.67128%;"><col style="width: 4.67128%;"><col style="width: 3.38499%;"><col style="width: 3.45269%;"><col style="width: 3.11419%;"><col style="width: 4.19738%;"><col style="width: 10.3581%;"><col style="width: 8.12397%;"><col style="width: 7.85317%;"><col style="width: 6.97307%;"><col style="width: 6.70227%;"><col style="width: 6.70227%;"><col style="width: 7.10847%;"><col style="width: 7.78547%;"><col style="width: 14.8262%;"></colgroup>
      <tbody>
      <tr style="height: 82.1806px;">
      <td style="text-align: center;" colspan="3"><span style="font-size: 8pt;">Name</span></td>
      <td style="text-align: center;" rowspan="2"><span style="font-size: 8pt;">AGE</span><br><span style="font-size: 8pt;"><br></span></td>
      <td style="text-align: center;" rowspan="2"><span style="font-size: 8pt;">SEX</span><br><span style="font-size: 8pt;"><br></span></td>
      <td style="text-align: center;" rowspan="2">
      <p><span style="font-size: 8pt;">TENURE</span><br><span style="font-size: 8pt;">(P/COS)</span></p>
      </td>
      <td style="text-align: center;" rowspan="2">
      <p><span style="font-size: 8pt;">Related Certification/Appropriate Current PRC License</span></p>
      </td>
      <td style="text-align: center;" colspan="5">Educational Background (Specify Degree Obtained)</td>
      <td style="text-align: center;" rowspan="2">
      <p><span style="font-size: 8pt;">&nbsp;</span></p>
      <p><span style="font-size: 8pt;">Designation</span></p>
      </td>
      <td style="text-align: center;" rowspan="2">
      <p><span style="font-size: 8pt;">Teaching experience (No. of years)</span></p>
      </td>
      <td style="text-align: center;" rowspan="2">
      <p><span style="font-size: 8pt;">Membership in Professional Organization</span></p>
      </td>
      </tr>
      <tr style="height: 113.819px;">
      <td style="text-align: center;"><span style="font-size: 8pt;">Last Name</span></td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">First Name</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Middle Initial</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Doctorate Degree</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Master&rsquo;s Degree</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Baccalaureate Degree</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Specialization</span></p>
      </td>
      <td style="text-align: center;">
      <p><span style="font-size: 8pt;">Enrollment Status (Enrolled or Not enrolled)</span></p>
      </td>
      </tr>
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
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      </div>
      </div>`;
    editor.insertContent(newPage);
  }

  insertNewTeachingPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
      <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
      <p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Teaching and Learning Monitoring Form -2</span></strong></p>
      <p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Faculty:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College/Department:</span></span></p>
      <p class="MsoNormal" style="text-align: left;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"> &nbsp;Date Covered:</span></span><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date Submitted:</span></span></p>
      <div align="center">
      <table class="MsoTableGrid" style="border-collapse: collapse; mso-table-layout-alt: fixed; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;" border="1" width="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">No.</span></strong></p>
      </td>
      <td style="width: 88.7pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Courses Handled /</span></strong></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Year &amp; Section</span></strong></p>
      </td>
      <td style="width: 74.35pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Module Number</span></strong></p>
      </td>
      <td style="width: 9.0cm; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="4" width="410">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Synchronous</span></strong></p>
      </td>
      <td style="width: 239.2pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="3" width="282">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Asynchronous</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 1;">
      <td style="width: 9.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="4" width="410">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Virtual</span></strong></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Platform</span></strong></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Schedule of Consultations</span></strong></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Activities</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 2;">
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Platform</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Schedule of Meeting</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Meeting ID</span></strong></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Password / Class Password</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Activities</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 3;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSEMC1A &amp; 1B</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1 - 3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T.<br>2:30 &ndash; 3:30 P.M.</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 9.0pt; line-height: 150%; font-family: 'Arial',sans-serif; color: #5f6368; letter-spacing: .25pt; background: white;">meet.google.com/gyo-qvbw-apm</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T. </span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">12:00 &ndash; 1:00 P.M</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 4;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">2</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSCS-1A</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1.3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">W.Th.</span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">6:00<span style="mso-spacerun: yes;">&nbsp; </span>&ndash; 7:00 P.M</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 13.5pt;" align="center"><span lang="EN-US" style="font-size: 9.0pt; color: #70757a;">https://meet.google.com/cmm-axge-mcr</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">WTh <br>9:00 &ndash; 11:30 A.M.</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 5; mso-yfti-lastrow: yes;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">3</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSIT1A &ndash; 1B</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1 - 3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Friday</span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-family: 'Times New Roman',serif;">10:00 <span style="mso-spacerun: yes;">&nbsp;</span>12:00 P.M.</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 13.5pt;" align="center"><span lang="EN-US" style="font-size: 9.0pt; color: #70757a;">https://meet.google.com/rgw-wzrz-hmp</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T. </span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">12:00 &ndash; 1:00 P.M.</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal; tab-stops: 63.8pt 326.05pt 630.8pt;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><span style="font-size: 12pt;">Reynaldo G. Bautista Jr </span></span><span style="font-size: 12pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <u><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Dr. Erlinda C. Abarintos</span></u></span><span style="font-size: 12pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Ms. Kristin Mendoza</span></u></span></span></span><u><span style="font-weight: bold;"><br></span></u><span style="font-size: 8pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature of Faculty&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dean, College of Computer Studies&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Head, HRMU</span></span></span></span></strong></p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 10pt;">GC-Acad-Form-<span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp;</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u><br></u></span><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span style="font-size: 10pt;">cc. VPA</span></span></span></span><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-size: 10pt;">A, Dean, HRMU, Faculty&nbsp;&nbsp;</span></span></span></span></span><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"> &nbsp;</span></span></span></span></strong></p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"></span></span></span></span></strong></p>
      </div>
      </div>
      <div class="footer">
      <div class="break"></div>
    </div>
      </div>
    `;
    editor.insertContent(newPage);
  }

  insertNewFacultySchedPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
      <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><span style="font-family: arial, helvetica, sans-serif;"><img src="../../../../../assets/img/CCS.png"></span></div>
      <p class="gc-logo"><span style="font-family: arial, helvetica, sans-serif;"><img style="float: left;" src="../../../../../assets/img/GC.png"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt; font-family: arial, helvetica, sans-serif;">Republic of the Philippines&nbsp;</span><br><span style="font-family: arial, helvetica, sans-serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 12pt;">INDIVIDUAL FACULTY LOAD AND SCHEDULE</span></strong> </span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 9.0pt; color: black; mso-bidi-font-style: italic;">Semester: 1st, Academic Year: <u>2022 - 2023</u></span></strong> </span></p>
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
      <div class="footer">
      <div class="break"></div>
    </div>
      </div>
    `;
    editor.insertContent(newPage);
  }

  insertNewEventReportPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Event Report</span></strong></p>
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
    <p><div class="break"></div></p>
    
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></span></p>
    <p><span style="font-family: 'times new roman', times, serif;"><strong>Budget overview:</strong></span></p>
    <p><span style="font-family: 'times new roman', times, serif;"><strong>Actual expenditures:</strong></span></p>
    <p><span style="font-family: 'times new roman', times, serif;"><strong>Sponsorship and donations:</strong></span></p>
    <p>&nbsp;</p>
    <p><span style="font-family: 'times new roman', times, serif;"><strong>Overall assessment of the event:</strong></span></p>
    <p><span style="font-family: 'times new roman', times, serif;"><strong>Recommendations for future events:</strong></span></p>
    <p>&nbsp;</p>
    <div class="collage-container" style="width: 900px; display: flex; flex-wrap: wrap; gap: 20px; resize: both; overflow: auto;">
    <div class="image-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: auto;">
    <div class="image-placeholder" style="height: 300px; background-color: #ccc;">&nbsp;</div>
    <div class="text-box" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;" contenteditable="true">CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.</div>
    </div>
    <div class="image-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: auto;">
    <div class="image-placeholder" style="height: 300px; background-color: #ccc;">&nbsp;</div>
    <div class="text-box" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;" contenteditable="true">CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.</div>
    </div>
    </div>
    <p><strong>&nbsp;</strong></p>
    </div>
    <div class="footer">
      <div class="break"></div>
    </div>
    </div>`;
    editor.insertContent(newPage);
  }
  
  insertNewFinancialReportPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Financial Report</span></strong></p>
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
    <p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;"><div class="break"></div></span></span></span></p>
    
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
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
    <div class="footer">
      <div class="break"></div>
    </div>
    </div>`;
    editor.insertContent(newPage);
  }

  insertNewSummaryReportPage(editor: Editor): void {
    const newPage = `
    <div class="whole-page">
    <div class="content">
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: center;"><br><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">SUMMARY OF ACCOMPLISHMENTS AND ACTIVITIES</span></strong></p>
    <p style="line-height: 1.1; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">FOR 1<sup>st</sup> Semester A.Y. 2023 - 2024</span></strong></p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of Student Organization<span style="mso-tab-count: 1;">&nbsp; &nbsp;</span>:</span></strong></p>
    <p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of President<span style="mso-tab-count: 3;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>:&nbsp;</span></strong></p>
    <table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 801.391px; width: 958px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 93px;">
    <td style="width: 217.3px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activities Undertaken</span></strong></p>
    </td>
    <td style="width: 226.812px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Dates and Places / Platform</span></strong></p>
    </td>
    <td style="width: 243.363px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activity Main Objective</span></strong></p>
    </td>
    <td style="width: 208.925px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Remarks</span></strong></p>
    </td>
    </tr>
    <tr style="height: 174px;">
    <td style="width: 217.3px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
    <td style="width: 226.812px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
    <td style="width: 243.363px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal">&nbsp;</p>
    </td>
    <td style="width: 208.925px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    </tr>
    <tr style="height: 120px;">
    <td style="width: 217.3px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal">&nbsp;</p>
    </td>
    <td style="width: 226.812px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
    </td>
    <td style="width: 243.363px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
    </td>
    <td style="width: 208.925px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    </tr>
    <tr style="height: 228px;">
    <td style="width: 217.3px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal">&nbsp;</p>
    </td>
    <td style="width: 226.812px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
    </td>
    <td style="width: 243.363px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
    </td>
    <td style="width: 208.925px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    </tr>
    <tr style="height: 186.391px;">
    <td style="width: 217.3px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal">&nbsp;</p>
    </td>
    <td style="width: 226.812px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
    </td>
    <td style="width: 243.363px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
    </td>
    <td style="width: 208.925px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
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
    <p class="MsoNormal"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;"><div class="break"></div></span></strong></p>
    
    <div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png"></div>
    <p class="gc-logo"><img style="float: left;" src="assets/img/GC.png"></p>
    <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
    <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
    <table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 535.391px; width: 958px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 278.781px;">
    <td style="width: 217.094px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    <td style="width: 226.594px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    <td style="width: 243.125px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    <td style="width: 208.688px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
    </td>
    </tr>
    <tr style="height: 256.609px;">
    <td style="width: 217.094px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
    <td style="width: 226.594px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
    <td style="width: 243.125px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
    <p class="MsoNormal">&nbsp;</p>
    </td>
    <td style="width: 208.688px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
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
    <div class="footer">
      <div class="break"></div>
    </div>
    </div>`;
    editor.insertContent(newPage);
  }

  insertCollage(editor: Editor, count: number): void {
    const collageTemplate = `
    <div class="collage-container" style="width: 900px; display: flex; flex-wrap: wrap; gap: 20px; resize: both; overflow: auto;">
    ${Array.from({ length: count }).map(() => `
          <div class="image-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: auto;">
            <div class="image-placeholder" style="height: 300px; background-color: #ccc;"></div>
            <div class="text-box" contenteditable="true" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;">
              CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.
            </div>
          </div>
        `).join('')}
      </div>
    `;
    editor.insertContent(collageTemplate);
  }
  
  insertImgContainer(editor: Editor) {
    const imgContainer = `
      <div class="img-container" style="width: 300px; margin-bottom: 20px; display: flex; flex-direction: column; resize: both; overflow: auto;">
        <div class="image-placeholder" style="height: 300px; background-color: #ccc;"></div>
        <div class="text-box" contenteditable="true" style="flex: 1; min-height: 10%; display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 10px;">
              CCS Day is an annual event dedicated to celebrating innovation and collaboration in the tech industry. This year, CCS Day brings together industry leaders, developers, and enthusiasts to explore the latest trends and technologies shaping our digital future. Participants can expect insightful keynote speeches, engaging panel discussions, and hands-on workshops designed to inspire creativity and foster meaningful connections within the community.
        </div>
      </div>
    `;
    editor.insertContent(imgContainer);
  }
  
}
