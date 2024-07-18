import { Component, Input, ElementRef, Renderer2, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { DisplayManagementService } from '../../../services/display-management.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, Subscription, catchError, forkJoin, map, of, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgClass, Location } from '@angular/common'
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { Subcategory } from '../../../models/enum/subcategory.enum';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AdFormService } from './ad-form.service';
import { AlertMessage } from '../../../models/enum/alert-message.enum';
import { AlertType } from '../../../models/alert.model';
import { escapeHtml } from '../../../utils/sanitizers/custom-sanitizers';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { ImageService } from '../../../services/image.service';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
  standalone: true,
  imports: [FormsModule, NgSelectModule, NgxDropzoneModule, NgClass, NgbCarousel, NgbSlide, DropzoneModule]
})
export class AdFormComponent implements AfterViewChecked {
  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;
  // TO DO: check if I'll have to merge adModel and adDetails model (fix cloudinary branch)
  // TODO :: checker si toutes les propriétés sont utiles 
  ad: AdDetails = new AdDetails();
  today: Date = new Date()
  selectedPicNumber: number = 2;
  articlePictures: FormData[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  disabledFields: boolean = false;
  hasInteractedWithDropzone: boolean = false;

  // TO DO : mutualiser ca qqpart pour eviter la repetition entre adForm et profilePic componenet
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


  constructor(
    private adformService: AdFormService,
    private uploadPictureService: UploadPictureService,
    private imageService: ImageService,
    private router: Router,
    private displayManagementService: DisplayManagementService,
    private location: Location,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  ngAfterViewChecked(): void {
    this.updateDropzoneDimension(this.selectedPicNumber);
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

  // createAdPictureArray() {
  //   this.filesArrays.forEach(filesArray => {
  //     if (filesArray.length > 0) {
  //       this.articlePictures.push(filesArray[0]);
  //     }
  //   });
  // }

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

  updateDropzoneDimension(dropzoneCount: number) {
    let dropzoneClass: string = '';
    const dropzones = this.el.nativeElement.querySelectorAll('.articlePicDropzones');
    dropzones.forEach((dropzone: any) => {
      this.renderer.removeClass(dropzone, 'two-dropzones');
      this.renderer.removeClass(dropzone, 'three-dropzones');
      this.renderer.removeClass(dropzone, 'four-dropzones');
      this.renderer.removeClass(dropzone, 'five-dropzones');
    });
    if (dropzones.length > 0) {
      switch (dropzoneCount) {
        case 2:
          dropzoneClass = 'two';
          break;
        case 3:
          dropzoneClass = 'three';
          break;
        case 4:
          dropzoneClass = 'four';
          break;
        case 5:
          dropzoneClass = 'five';
          break;
        default:
          dropzoneClass = 'two';
      }
      let newClass: string = `${dropzoneClass}-dropzones`;
      dropzones.forEach((dropzone: any) => {
        this.renderer.addClass(dropzone, `${newClass}`);
      });
      const dzWrapper = this.el.nativeElement.querySelectorAll('.dz-wrapper');
      dzWrapper.forEach((wrapper: any) => {
        this.renderer.setStyle(wrapper, 'overflow', 'visible');
      });
      const dzMessages = this.el.nativeElement.querySelectorAll('.dz-message');
      dzMessages.forEach((dzMessage: any) => {
        const nextSibling = dzMessage.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('dz-preview')) {
          this.renderer.setStyle(dzMessage, 'display', 'none !important');
        }
      });
    } else {
      console.error('Elements with class dz-wrapper not found');
    }
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }

  // uploadArticlePictures(): Observable<any> {
  //   this.ad.articlePictures = [];
  //   this.createAdPictureArray();

  //   let uploadObservables: Observable<any>[] = [];

  //   for (let i = 0; i < this.articlePictures.length; i++) {
  //     let publicId = `articlePicture-${this.ad.title}-${i + 1}`;
  //     uploadObservables.push(
  //       this.imageService.upload(this.articlePictures[i], publicId).pipe(
  //         map(response => ({
  //           secure_url: response.secure_url
  //         })),
  //         catchError((error: any) => {
  //           console.error('Error occurred during image upload:', error);
  //           // Handle the error as needed, e.g., return a fallback value
  //           return of({ secure_url: null });
  //         })
  //       )
  //     );
  //   }

  //   return forkJoin(uploadObservables).pipe(
  //     tap((responses: any[]) => {
  //       responses.forEach(response => {
  //         if (response.secure_url) {
  //           let newArticlePicture: String = new String(response.secure_url);
  //           this.ad.articlePictures!.push(newArticlePicture);
  //         }
  //       });
  //     }),
  //     catchError((error: any) => {
  //       console.error('Error occurred during image upload:', error);
  //       throw error;
  //     })
  //   );
  // }

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

  sanitizeTheInputs() {
    escapeHtml(this.ad.title!)
    escapeHtml(this.ad.articleDescription!)
  }

  // TO DO :: a revoir (fix Cloudinary branch)
  onSubmit() {
    //   this.sanitizeTheInputs()
    //   this.uploadArticlePictures().subscribe({
    //     next: () => {
    //       this.ad.creationDate = this.today.toISOString();
    //       this.ad.subcategory = this.ad.category == "Autre" ?
    //         Subcategory.OTHER_SUBCATEGORY :
    //         this.ad.subcategory.name;
    //       this.ad.publisherId = Number(localStorage.getItem('userId')!);
    //       this.adformService.postAd(this.ad).subscribe({
    //         next: (ad: AdDetails) => {
    //           this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
    //           setTimeout(() => {
    //             this.displayManagementService.displayAlert({
    //               message: AlertMessage.AD_CREATED_SUCCES,
    //               type: AlertType.SUCCESS
    //             });
    //           }, 100);
    //         },
    //         error: (error: any) => {
    //           this.displayManagementService.displayAlert({
    //             message: AlertMessage.DEFAULT_ERROR,
    //             type: AlertType.ERROR
    //           });
    //         }
    //       });
    //     },
    //     error: (error: any) => {
    //       console.error('Error occurred during image upload:', error);
    //       this.displayManagementService.displayAlert({
    //         message: AlertMessage.UPLOAD_PICTURE_ERROR,
    //         type: AlertType.ERROR
    //       });
    //     }
    //   });
  }
}