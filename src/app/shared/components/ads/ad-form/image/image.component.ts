import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../../services/image.service';
import { Image } from '../../../../models/ad/image.model';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit {
  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];

  constructor(
    private imageService: ImageService
  ) {

  }

  ngOnInit(): void {
    this.fetchImages();
  }

  onFileChange(event: any) {

    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }

  onUpload(event: Event): void {
    event.preventDefault()
    if (this.image) {
      console.log('this.image:: ', this.image)
      this.imageService.upload(this.image).subscribe({
        next: (data) => {
          console.error(data)

          this.fetchImages();
        },
        error: error => {
          this.reset();
          this.fetchImages();
        }
      })
    }
  }

  reset(): void {
    this.image = null;
    this.imageMin = null;
    const imageInputFile = document.getElementById('image') as HTMLInputElement;
    if (imageInputFile) {
      imageInputFile.value = '';
    }
  }

  fetchImages(): void {
    this.imageService.list().subscribe({
      next: (images: Image[]) => {
        this.images = images;
      },
      error: error => {
        console.error('Error fetching images:', error);
      }
    })
  }

  deleteImage(id: any): void {
    // Swal.fire({
    //   title: 'Confirmation',
    //   text: 'Are you sure you want to continue?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Oui',
    //   cancelButtonText: 'Non',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    this.imageService.delete(id).subscribe(
      () => {
        this.fetchImages();
        // Swal.fire('Image deleted !');

      },
      error => {
        console.error('Error deleting image:', error);
      }
    );
    // } else if (result.dismiss === Swal.DismissReason.cancel) {
    //   Swal.fire('Operation canceled', '', 'error');
    // }
    // });

  }
}
