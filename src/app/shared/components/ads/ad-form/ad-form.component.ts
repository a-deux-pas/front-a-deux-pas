import { Component, Input } from '@angular/core';
import { Ad } from '../../../models/ad/ad.model';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { DisplayManagementService } from '../../../services/display-management.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, Subscription, catchError, tap } from 'rxjs';
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

  //TODO: check if I'll have to merge adModel and adDetails model (fix cloudinary branch)
  ad: Ad = new Ad(
    1,
    '',
    '',
    '',
  );

  today: Date = new Date()
  selectedPicNumber: number = 2;
  articlePictures: File[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  disabledFields: boolean = false

  constructor(
    private adformService: AdFormService,
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
        this.ad.creationDate = this.today.toISOString();
        this.ad.subcategory = this.ad.category == "Autre" ?
          Subcategory.OTHER_SUBCATEGORY :
          this.ad.subcategory.name;
        this.ad.publisherId = parseInt(localStorage.getItem('userId')!);
        this.adformService.postAd(this.ad).subscribe({
          next: (ad: Ad) => {
            // @Erika, je te laisse checker si cela est vraiment nécéssaire
            this.disabledFields = true;
            setTimeout(() => {
              this.disabledFields = false;
            });
            this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
            setTimeout(() => {
              this.displayManagementService.displayAlert({
                message: AlertMessage.AD_CREATED_SUCCES,
                type: AlertType.SUCCESS
              });
            }, 100);
          },
          error: (error: any) => {
            this.displayManagementService.displayAlert({
              message: AlertMessage.DEFAULT_ERROR,
              type: AlertType.ERROR
            });
          }
        });
      },
      error: (error: any) => {
        console.error('Error occurred during image upload:', error);
        this.displayManagementService.displayAlert({
          message: AlertMessage.UPLOAD_PICTURE_ERROR,
          type: AlertType.ERROR
        });
      }
    });
  }
}
