import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { DropzoneConfigService } from '../../../services/dropzone-config.service';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

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

  config: DropzoneConfigInterface;
  customMessage: string = `
    <div class="dropzone-add">
      <img src="assets/icons/buttons/add-orange.webp" alt="Icône d'ajout de photo" class="dropzone-icon" />
      <span>ajouter une photo</span>
    </div>
  `;

  constructor(public parentForm: FormGroupDirective,
    private dropzoneConfigService: DropzoneConfigService) {
    this.config = this.dropzoneConfigService.getConfig();
  }

  ngAfterViewInit(): void {
    const dropzone = this.dropzoneComponent.directiveRef?.dropzone();

    dropzone.on('thumbnail', (file: File) => {
      this.isProfilePicturePreview = true;
      this.thumbnailGenerated.emit(file);
    });

    dropzone.on('removedfile', () => {
      this.isProfilePicturePreview = false;
      this.fileRemoved.emit();
    });
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }
}
