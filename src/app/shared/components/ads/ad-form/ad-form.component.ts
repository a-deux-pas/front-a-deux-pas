import { Component, Input, HostListener, ViewChild, OnInit } from '@angular/core';
import { Ad } from '../../../models/ad/ad.model';
import { User } from '../../../models/user/user.model';
import { AdService } from '../../../../routes/Ad.service';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, catchError, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewportScroller, NgClass } from '@angular/common'
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/Categories';
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
export class AdFormComponent implements OnInit {
  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;

  isBigScreen: boolean | undefined
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
  selectedPicNumber: number = 1;
  articlePictures: File[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);

  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false
  disabledFields: boolean = false

  // This HostListener listens for window resize events
  // When a resize event occurs, the onResize method is triggered
  // It takes the event object as a parameter
  // The isBigScreen property is updated based on the inner width of the event target
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = window.innerWidth > 1200;
  }

  ngOnInit(): void {
    this.isBigScreen = window.innerWidth > 1200;
  }

  constructor(
    private adService: AdService,
    private uploadPictureService: UploadPictureService,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) { }

  // article category selection section
  getSubCategories() {
    const currentCategory = Categories.find(category => category.name === this.ad.category);
    if (currentCategory) {
      return currentCategory.subCategories;
    }
    return [];
  }

  getSubCategoriesGender() {
    const currentCategory = Categories.find(category => category.name === this.ad.category);
    if (currentCategory) {
      const currentSubCategory = currentCategory.subCategories.find(subCat => subCat.name === this.ad.subcategory.name);
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
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  togglePaused() {
    if (this.paused) {
      this.carousel!.cycle();
    } else {
      this.carousel!.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  onSubmit() {
    this.uploadArticlePictures().subscribe({
      next: () => {
        console.log('All images uploaded successfully');
        this.ad.creationDate = this.today;
        if (this.ad.category == "Autre") {
          console.log('ici')
          this.ad.subcategory = Subcategory.OTHER_SUBCATEGORY;
          console.log(' this.ad.subcategory:: ', this.ad.subcategory)
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
