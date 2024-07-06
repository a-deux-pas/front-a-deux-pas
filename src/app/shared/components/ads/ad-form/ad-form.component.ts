import { Component, Input } from '@angular/core';
import { Ad } from '../../../models/ad/ad.model';
import { AdService } from '../../../../routes/ad/ad.service';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { DisplayManagementService } from '../../../services/display-management.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, Subscription, catchError, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgClass, Location } from '@angular/common'
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { Subcategory } from '../../../models/enum/subcategory.enum';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
  standalone: true,
  imports: [FormsModule, NgSelectModule, NgxDropzoneModule, NgClass, NgbCarousel, NgbSlide]
})
export class AdFormComponent {
  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;

  ad: Ad = new Ad(
    1,
    '',
    '',
    new Date(),
  );

  today: Date = new Date()
  selectedPicNumber: number = 2;
  articlePictures: File[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false
  disabledFields: boolean = false

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

// TO DO :: a revoir (fix Cloudinary branch)
  onSubmit() {
    this.uploadArticlePictures().subscribe({
      next: () => {
        this.ad.creationDate = this.today;
        if (this.ad.category == "Autre") {
          this.ad.subcategory = Subcategory.OTHER_SUBCATEGORY;
        } else {
          this.ad.subcategory = this.ad.subcategory.name
        }
        this.ad.publisherId = parseInt(localStorage.getItem('userId')!);
        this.adService.postAd(this.ad).subscribe({
          next: (ad: AdPostResponse) => {
            this.disabledFields = true;
            setTimeout(() => {
              this.disabledFields = false;
            }, 3000);
            this.router.navigate(['compte/annonces/mon-annonce/', ad.id], {
              queryParams: { success: true }
            });
          },
          error: (error: any) => {
            this.errorWhenSubmittingMsg = true;
            this.disabledFields = true;
            setTimeout(() => {
              this.errorWhenSubmittingMsg = false;
              this.disabledFields = false;
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
