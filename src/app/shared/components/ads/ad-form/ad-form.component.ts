import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Ad } from '../../../models/ad/ad.model';
import { User } from '../../../models/user/user.model';
import { AdService } from '../../../../routes/ad/ad.service';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { DisplayManagementService } from '../../../services/display-management.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, Subscription, catchError, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common'
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { Subcategory } from '../../../models/enum/subcategory.enum';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';


@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
  standalone: true,
  imports: [FormsModule, NgSelectModule, NgxDropzoneModule, CommonModule, NgbCarousel, NgbSlide, DropzoneModule]
})
export class AdFormComponent implements AfterViewInit {
  hasInteractedWithDropzone: boolean = false;
  isProfilePictureUploaded: boolean = false;
  errorMessage: string = '';
  @Input() isFormSubmitted: boolean = false;
  @Output() uploadSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() thumbnailGenerated: EventEmitter<void> = new EventEmitter<void>();
  @Output() fileRemoved: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(DropzoneComponent) dropzoneComponent!: DropzoneComponent;


  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;

  isPostAdForm: boolean | undefined;

  ad: Ad = new Ad(
    1,
    '',
    '',
    new Date(),
  );

  user!: User;
  publisher: User | undefined;
  today: Date = new Date()
  selectedPicNumber: number = 2;
  articlePictures: File[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);

  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false
  disabledFields: boolean = false

  files: File[] = [];

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

  constructor(
    private adService: AdService,
    private uploadPictureService: UploadPictureService,
    private router: Router,
    private displayManagementService: DisplayManagementService,
    private location: Location
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

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

    // this.dropzone!.on("removedfile", (file) => {
    //   console.log("File removed:", file);
    //   this.files = this.files.filter(f => f !== file);
    // });

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
      console.log('Processing queue...');
      }
    }, 0);
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }

  // article category selection section
  getSubCategories() {
    const currentCategory = Categories.find((category: { name: Category }) => category.name === this.ad.category);
    if (currentCategory) {
      return currentCategory.subCategories;
    }
    return [];
  }

  getSubCategoriesGender() {
    const currentCategory = Categories.find((category: { name: Category }) => category.name === this.ad.category);
    if (currentCategory) {
      const currentSubCategory = currentCategory.subCategories.find((subCat: { name: Subcategory }) => subCat.name === this.ad.subcategory.name);
      if (currentSubCategory?.gender) {
        return currentSubCategory.gender;
      }
    }
    return [];
  }

  resetChoices() {
    this.ad.subcategory = undefined
    this.ad.articleGender = undefined
  }

  // picture upload
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  files4: File[] = [];
  files5: File[] = [];

  filesArrays: File[][] = [];

  onRemove(file: File, dropzoneNumber: number) {
    const filesArray = this.getFilesArray(dropzoneNumber);
    filesArray.splice(filesArray.indexOf(file), 1);
  }

  onSelectPicture(event: { addedFiles: any; }, dropzoneNumber: number): void {
    const newPictureInDropzone = this.getFilesArray(dropzoneNumber);
    newPictureInDropzone.splice(0, newPictureInDropzone.length);
    newPictureInDropzone.push(...event.addedFiles);
    this.filesArrays = [this.files1, this.files2, this.files3, this.files4, this.files5];
  }

  createAdPictureArray() {
    this.filesArrays.forEach(filesArray => {
      if (filesArray.length > 0) {
        this.articlePictures.push(filesArray[0]);
      }
    });
  }

  getArray(length: number): any[] {
    return Array.from({ length }, (_, index) => index);
  }

  getFilesArray(dropzoneNumber: number): File[] {
    switch (dropzoneNumber) {
      case 0:
        return this.files1;
      case 1:
        return this.files2;
      case 2:
        return this.files3;
      case 3:
        return this.files4;
      case 4:
        return this.files5;
      default:
        return [];
    }
  }

  uploadArticlePictures(): Observable<any> {
    this.ad.articlePictures = []
    this.createAdPictureArray()
    return this.uploadPictureService.uploadImages(this.articlePictures).pipe(
      tap((responses: any[]) => {
        responses.forEach(response => {
          let newArticlePicture: ArticlePicture = new ArticlePicture(response.secure_url);
          this.ad.articlePictures!.push(newArticlePicture);
        });
      }),
      catchError((error: any) => {
        console.error('Error occurred during image upload:', error);
        throw error;
      })
    );
  }

  checkThumbnail() {
    console.log('files.lenght:: ', this.files.length)
    const imageSection = document.querySelector('.dz-image') as HTMLImageElement;
    const dzPreview = document.querySelector('.dz-preview.dz-file-preview') as HTMLElement;
    const dzMessage = document.querySelector('.dz-message') as HTMLElement;

    if (imageSection && imageSection.src) {
      console.log('image ajoutée')
      dzPreview.style.display = 'block';
      dzMessage.style.display = 'none';
    } else {
      console.log('image retirée')
      dzPreview.style.display = 'none';
      dzMessage.style.display = 'block';
    }
  }

  // image selection carrousel for mobile device

  togglePaused() {
    this.displayManagementService.togglePaused()
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.displayManagementService.onSlide(slideEvent)
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.uploadArticlePictures().subscribe({
      next: () => {
        this.ad.creationDate = this.today;
        if (this.ad.category == "Autre") {
          this.ad.subcategory = Subcategory.OTHER_SUBCATEGORY;
        } else {
          this.ad.subcategory = this.ad.subcategory.name
        }
        // TODO: à enlever une fois la connexion implémentée
        this.ad.publisherId = 1;
        this.adService.postAd(this.ad).subscribe({
          next: (ad: AdPostResponse) => {
            this.disabledFields = true;
            setTimeout(() => {
              this.router.navigate(['compte/annonces/mon-annonce/', ad.id], {
                queryParams: { success: true }
              });
            }, 1000);
          },
          error: (error: any) => {
            console.error(error);
            this.errorWhenSubmittingMsg = true;
            setTimeout(() => {
              this.errorWhenSubmittingMsg = false;
            }, 3000);
          }
        });
      },
      error: (error: any) => {
        console.error('Error occurred during image upload:', error);
      }
    });
  }
}
