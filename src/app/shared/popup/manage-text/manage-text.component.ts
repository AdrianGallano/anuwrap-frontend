import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class ManageTextComponent implements OnInit {
  sentences: any[] = [];
  selectedSentence: any;
  sentenceForm: FormGroup;
  error: string | null = null;
  filteredSentences: any[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private sentenceService: SentanceService,
    public dialogRef: MatDialogRef<ManageTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sentences = data.sentences || [];
    this.sentenceForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required] 
    });
  }

  ngOnInit() {
    this.getSentences();
    this.searchControl.valueChanges.subscribe(value => {
      this.filtersentences();
    });
  }

  getSentences() {
    this.sentenceService.getTexts().subscribe(
      (response) => {
        this.sentences = response.data.sentences;
        this.filtersentences();
      },
      (error) => {
        console.error('Error fetching sentences:', error);
      }
    );
  }

  onSubmit() {
    if (this.selectedSentence) {
      this.editSentence();
    } else {
      this.addSentence();
    }
  }

  addSentence() {
    if (this.sentenceForm.valid) {
      const newTitle = this.sentenceForm.value.title;
      const newSentence = this.sentenceForm.value.text;
      this.sentenceService.createText({ title: newTitle, text: newSentence }).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding sentence:', error);
        }
      );
    } else {
      this.error = "Title and Sentence are required!";
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

  editSentence() {
    if (this.selectedSentence && this.sentenceForm.valid) {
      const updatedTitle = this.sentenceForm.value.title;
      const updatedText = this.sentenceForm.value.text;
      this.sentenceService.editText(this.selectedSentence.sentence_id, { title: updatedTitle, text: updatedText }).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error editing sentence:', error);
        }
      );
    } else {
      this.error = "Title and Sentence are required!";
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

  deleteSentence() {
    if (this.selectedSentence) {
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

  filtersentences() {
    const searchTerm = this.searchControl.value.toLowerCase();
    console.log(searchTerm)
    
    this.filteredSentences = this.sentences.filter(sentence => {
      const titleMatch = sentence.title.toLowerCase().includes(searchTerm);
      const textMatch = sentence.text.toLowerCase().includes(searchTerm);
      return titleMatch || textMatch;
    });
    console.log('filtered:', this.filteredSentences)
  }

  selectSentence(sentence: any) {
    this.selectedSentence = sentence;
    this.sentenceForm.patchValue({ 
      title: sentence.title,
      text: sentence.text 
    });
  }  

  unselectSentence() {
    this.selectedSentence = null;
    this.sentenceForm.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  insertSentence() {
    if (this.selectedSentence) {
      const sentenceText = this.selectedSentence.text;
      const editor = (window as any).tinymce.activeEditor;
      editor.execCommand('mceInsertContent', false, sentenceText);
      this.closeDialog();
    }
  }
}
