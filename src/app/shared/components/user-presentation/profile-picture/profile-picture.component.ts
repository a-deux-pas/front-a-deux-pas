import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [DropzoneModule],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
})
export class ProfilePictureComponent implements AfterViewInit {
  hasInteractedWithDropzone: boolean = false;
  pictureData = new FormData();
  isProfilePicturePreview: boolean = false;
  errorMessage: string = '';
  @Output() thumbnailGenerated: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() fileRemoved: EventEmitter<FormData> = new EventEmitter<FormData>();
  @ViewChild(DropzoneComponent) dropzoneComponent!: DropzoneComponent;

  config: DropzoneConfigInterface = {
    url: '/',
    acceptedFiles: 'image/*',
    uploadMultiple: false,
    createImageThumbnails: true,
    resizeMethod:"contain",
    thumbnailWidth:230,
    thumbnailHeight:230,
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

  constructor() {}

  ngAfterViewInit(): void {
    const dropzone = this.dropzoneComponent.directiveRef?.dropzone();

    dropzone.on('thumbnail', (file: File) => {
      this.isProfilePicturePreview = true;
      this.pictureData.set('userProfilePicture', file);
      console.log(this.pictureData.get('userProfilePicture'));
      this.thumbnailGenerated.emit(this.pictureData);
    });

    dropzone.on('removedfile', () => {
      this.pictureData.delete('userProfilePicture');
      console.log(this.pictureData.get('userProfilePicture'));
      this.isProfilePicturePreview = false;
      this.fileRemoved.emit(this.pictureData);
    });

    dropzone.on('error', (error: any) => {
      console.error('Upload failed:', error);
      this.errorMessage =
      "il y a eu une erreur lors du chargement de votre image, veuillez réessayer plus tard"
    });
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}
