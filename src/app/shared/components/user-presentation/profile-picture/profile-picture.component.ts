import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [DropzoneModule],
  templateUrl: './profile-picture.component.html'
})
export class ProfilePictureComponent implements AfterViewInit {
  profilePictureForm: any;
  hasInteractedWithDropzone: boolean = false;
  pictureData!: File;
  isProfilePicturePreview: boolean = false;
  errorMessage: string = '';
  @Output() thumbnailGenerated: EventEmitter<File> = new EventEmitter<File>();
  @Output() fileRemoved: EventEmitter<File> = new EventEmitter<File>();
  @ViewChild(DropzoneComponent) dropzoneComponent!: DropzoneComponent;

  config: DropzoneConfigInterface = {
    url: '/',
    acceptedFiles: 'image/*',
    uploadMultiple: false,
    createImageThumbnails: true,
    resizeMethod: "contain",
    thumbnailWidth: 230,
    thumbnailHeight: 230,
    addRemoveLinks: true,
    dictRemoveFile: "×",
    clickable: true,
    maxFiles: 1,
  };

  customMessage: string = `
    <div class="dropzone-add">
      <img src="assets/icons/buttons/add-orange.webp" alt="Icône d'ajout de photo" class="dropzone-icon" />
      <span>ajouter une photo</span>
    </div>
  `;

  constructor(public parentForm: FormGroupDirective, private imageService: ImageService) { }

  ngAfterViewInit(): void {
    const dropzone = this.dropzoneComponent.directiveRef?.dropzone();

    dropzone.on('thumbnail', (file: File) => {
      this.isProfilePicturePreview = true;
      this.thumbnailGenerated.emit(file);
      console.log('file: ', file)
    });

    dropzone.on('removedfile', () => {
      this.isProfilePicturePreview = false;
      this.fileRemoved.emit();
    });

    dropzone.on('error', (error: any) => {
      console.error('Upload failed:', error);
      this.errorMessage = "il y a eu une erreur lors du chargement de votre image, veuillez réessayer plus tard";
    });
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}