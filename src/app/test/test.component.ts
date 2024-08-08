// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import { isBrowser } from '../utils/is-browser';

// @Component({
//   selector: 'app-test',
//   standalone: true,
//   encapsulation: ViewEncapsulation.None,
//   imports: [ CKEditorModule, CommonModule],
//   templateUrl: './test.component.html',
//   styleUrl: './test.component.css'
// })
// export class TestComponent {
//   title = 'angular';
//   public Editor: any;
//   public config: any;

//   ngOnInit(): void {
//     if (isBrowser()) {
//       this.Editor = ClassicEditor;
//       this.config = {
//         toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
//         plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
//         licenseKey: '<YOUR_LICENSE_KEY>',
//         // mention: {
//         //     Mention configuration
//         // }
//       };
//     }
//   }
// }
