import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-image',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-image.component.html',
  styleUrl: './manage-image.component.css'
})
export class ManageImageComponent {
  images: any[] = [];
  selectedFile: File | null = null;
  selectedImage: any;

  constructor(
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ManageImageComponent>
  ) {
    this.loadImages();
  }

  // Handle file input change
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Get the file from the input event
    this.selectedFile = file;
  }

  // Upload the selected image when the button is clicked
  uploadImage(): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
          this.loadImages(); // Reload images after upload
          this.selectedFile = null; // Reset selected file
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    }
  }

  loadImages() {
    this.imageService.getAllImage().subscribe(
      (response: any) => {
        this.images = response.data.images; // Adjust according to API response structure
      },
      (error) => {
        console.error('Error loading images:', error);
      }
    );
  }

  deleteImage(imgId: number) {
    this.imageService.deleteImage(imgId).subscribe(
      () => {
        this.loadImages();
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }

  selectImage(image: any) {
    this.selectedImage = image;
    this.dialogRef.close(this.selectedImage); // Close the dialog and return the selected image
  }

  close() {
    this.dialogRef.close();
  }
}