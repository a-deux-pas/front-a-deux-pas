import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
      // this.pictureData.set('multipartFile', file);
      // console.log(this.pictureData.get('multipartFile'));

      this.pictureData.append('multipartFile', file);
      console.error('1.pictureData in profilePictureComponent::')
      this.pictureData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
        console.log(value);
      });
      this.thumbnailGenerated.emit(this.pictureData);
    });

    dropzone.on('removedfile', () => {
      this.pictureData.delete('multipartFile');
      console.log(this.pictureData.get('multipartFile'));
      this.isProfilePicturePreview = false;
      this.fileRemoved.emit(this.pictureData);
    });

    dropzone.on('error', (error: any) => {
      console.error('Upload failed:', error);
      this.errorMessage =
        "il y a eu une erreur lors du chargement de votre image, veuillez réessayer plus tard"
    });
  }

  // uploadProfilePicture(): any {
  //   this.imageService.upload( this.pictureData.get('multipartFile')!);
  // }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}