import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  isProfilePicturePreview: boolean = false;
  errorMessage: string = '';
  @Input() isFormSubmitted: boolean = false;
  @Output() uploadSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() thumbnailGenerated: EventEmitter<void> = new EventEmitter<void>();
  @Output() fileRemoved: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(DropzoneComponent) dropzoneComponent!: DropzoneComponent;

  config: DropzoneConfigInterface = {
    url: 'https://api.cloudinary.com/v1_1/erikaadeuxpas/upload/',
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
    autoProcessQueue: false,
    params: {
      upload_preset: 'adeupasProject'
    }
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
    console.log(dropzone);

    dropzone.on('thumbnail', () => {
      console.log('Thumbnail generated');
      this.isProfilePicturePreview = true;
      this.thumbnailGenerated.emit();
    });

    // à modifier
    dropzone.on('removedfile', () => {
      console.log('File removed');
      this.isProfilePicturePreview = false;
      this.fileRemoved.emit();
    });

    dropzone.on('error', (error: any) => {
      console.error('Upload failed:', error);
      this.errorMessage = "il y a eu une erreur lors du chargement de votre image, veuillez réessayer plus tard"
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFormSubmitted'] && this.isProfilePicturePreview) {
      const dropzone = this.dropzoneComponent.directiveRef?.dropzone();
      dropzone.options.autoProcessQueue = true;
      dropzone.processQueue();
      this.uploadSuccess.emit();
      console.log('Processing queue...');
      this.isProfilePicturePreview = false;
    }
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}
