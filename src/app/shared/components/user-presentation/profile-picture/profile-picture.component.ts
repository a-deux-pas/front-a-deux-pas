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
  isProfilePictureUploaded: boolean = false;
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
    addRemoveLinks: true,
    dictRemoveFile: "×",
    clickable: true,
    maxFiles: 1,
    autoProcessQueue: false,
    params: {
      upload_preset: 'adeupasProject'
    }
  };

  constructor() { }

  ngAfterViewInit(): void {
    const dropzone = this.dropzoneComponent.directiveRef?.dropzone();
    console.log(dropzone);

    dropzone.on('thumbnail', () => {
      console.log('Thumbnail generated');
      this.isProfilePictureUploaded = true;
      this.thumbnailGenerated.emit();
    });

    // à modifier
    dropzone.on('removedfile', () => {
      console.log('File removed');
      this.isProfilePictureUploaded = false;
      this.fileRemoved.emit();
    });

    dropzone.on('error', (error: any) => {
      console.error('Upload failed:', error);
      this.errorMessage = "il y a eu une erreur lors du chargement de votre image, veuillez réessayer plus tard"
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      const dropzone = this.dropzoneComponent.directiveRef?.dropzone();
      if (changes['isFormSubmitted'].currentValue) {
        dropzone.options.autoProcessQueue = true;
        dropzone.processQueue();
        this.uploadSuccess.emit();
        console.log('Processing queue...');
      }
    }, 0);
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}
