import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AnnualContentService } from '../../../../shared/services/annualcontent.service';
import tinymce from 'tinymce';
import { AiComponent } from "../../../../shared/ai/ai.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { interval, Subscription, switchMap } from 'rxjs';
import { SentanceService } from '../../../../shared/services/sentance.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageTextComponent } from '../../../../shared/popup/manage-text/manage-text.component';

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
          min-height: 1123px;
        }

        .faculty-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .teaching-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .facultysched-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .event-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .financial-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .summary-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
        }

        .syllabus-content-body {
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          height: auto;
          min-height: 1123px;
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
          position: relative;
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

        .teaching-header {
        width: 90%;
        top: 0;
        position: relative;
        margin: 0 auto;
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

      // editor.ui.registry.addMenuButton('insertSentence', {
      //   text: 'Insert Sentence',
      //   fetch: (callback: any) => {
      //     const items = this.sentences.map((sentence: any) => ({
      //       type: 'menuitem',
      //       text: sentence.text,
      //       onAction: () => this.insertSentence(editor, sentence.text)
      //     }));
      //     callback(items);
      //   }
      // });
      

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
  isBrowser: boolean;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private annualContentService: AnnualContentService,
    private cdr: ChangeDetectorRef,
    private sentenceService: SentanceService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
        
        
        this.setupDragAndDrop(editor);
        this.setupDeleteFunctionality(editor);
        this.applyHeaderStyling(editor)
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
        this.initializeContent(editor);
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

  insertNewEmptyPage(editor: any): void {
    const newPage =`<div class="whole-page" style="height: 1123px">

</div>
<p><div class="break"></div></p>`
    editor.insertContent(newPage)
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


  setupDeleteFunctionality(editor: any) {
    const deleteButtons = editor.getDoc().querySelectorAll('.delete-btn');
    deleteButtons.forEach((button: HTMLElement) => {
      button.addEventListener('click', () => {
        const container = (button as HTMLElement).closest('.collage-wrapper, .img-wrapper, img');
        if (container) {
          container.remove();
        }
      });
    });
  }
 

  navigateToReportSelection(): void {
    this.route.navigate([`./reportselection`], {relativeTo: this.aRoute})
  }
  
}


