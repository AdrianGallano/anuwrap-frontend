import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SentanceService } from '../../services/sentance.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatListModule, CommonModule],
  templateUrl: './manage-text.component.html',
  styleUrls: ['./manage-text.component.css']
})
export class ManageTextComponent {
  sentences: any[] = [];
  selectedSentence: any;
  sentenceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sentenceService: SentanceService,
    public dialogRef: MatDialogRef<ManageTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sentences = data.sentences || [];
    this.sentenceForm = this.fb.group({
      text: ['']
    });
  }

  ngOnInit() {
    this.getSentences()
    console.log(this.sentences)
  }

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
  }

  getSentences() {
    this.sentenceService.getTexts().subscribe(
      (respose)=> {
        this.sentences = respose.data.sentences
      }
    )
  }

  addSentence() {
    const newSentence = this.sentenceForm.value.text;
    this.sentenceService.createText({ text: newSentence }).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error: any) => {
        console.error('Error adding sentence:', error);
      }
    );
  }

  editSentence() {
    if (this.selectedSentence) {
      const updatedText = this.sentenceForm.value.text;
      console.log(this.selectedSentence.sentence_id)
      this.sentenceService.editText(this.selectedSentence.sentence_id, { text: updatedText }).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.error('Error editing sentence:', error);
        }
      );
    }
  }

  deleteSentence() {
    if (this.selectedSentence) {
      console.log(this.selectedSentence.sentence_id)
      this.sentenceService.deleteText(this.selectedSentence.sentence_id).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error deleting sentence:', error);
        }
      );
    }
  }

  selectSentence(sentence: any) {
    this.selectedSentence = sentence;
    this.sentenceForm.patchValue({ text: sentence.text });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
