import { Component, Input, HostListener, ViewChild, OnInit } from '@angular/core';
import { Ad } from '../../../../../model/ad.model';
import { User } from '../../../../../model/user.model';
import { AdService } from '../../../../routes/Ad.service';
import { UploadPictureService } from '../../../../../services/upload-picture.service';
import { ArticlePicture } from '../../../../../model/article-picture.model';
import { Observable, catchError, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common'
import { AdResponse } from '../../../../../model/adResponse.model';
import { ArticleState } from '../../../models/enums/ArticleState';
import { Category } from '../../../models/enums/Category';
import { modeSubCategory, electronicSubCategory, houseSubCategory, hobbySubCategory, otherSubCategory } from '../../../models/enums/Subcategory';
import { Gender } from '../../../models/enums/Gender';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
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
  adGender = Object.values(Gender);
  modeSubCat = Object.values(modeSubCategory);
  electroSubCat = Object.values(electronicSubCategory);
  houseSubCat = Object.values(houseSubCategory);
  hobbySubCat = Object.values(hobbySubCategory);
  otherSubCat = Object.values(otherSubCategory);

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
    if (this.ad.category === Category.FASHION) {
      return Object.values(modeSubCategory);
    } else if (this.ad.category === Category.ELECTRONICS) {
      return Object.values(electronicSubCategory);
    } else if (this.ad.category === Category.HOME) {
      return Object.values(houseSubCategory);
    } else if (this.ad.category === Category.LEISURE) {
      return Object.values(hobbySubCategory);
    } else if (this.ad.category === Category.OTHER_CATEGORY) {
      return Object.values(otherSubCategory);
    }
    return [];
  }

  getSubCategoriesGender() {
    if (this.ad.subcategory === modeSubCategory.TOPS || this.ad.subcategory === modeSubCategory.BOTTOMS) {
      return Object.values(Gender);
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
    console.log(event)
    console.log(dropzoneNumber)
    const newPictureInDropzone = this.getFilesArray(dropzoneNumber);
    newPictureInDropzone.splice(0, newPictureInDropzone.length);
    newPictureInDropzone.push(...event.addedFiles);
    this.filesArrays = [this.files1, this.files2, this.files3, this.files4, this.files5];
    console.error('filesArrays:: ', this.filesArrays)
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
    console.error('this.articlePictures:: ', this.articlePictures)
    return this.uploadPictureService.uploadImages(this.articlePictures).pipe(
      tap((responses: any[]) => {
        responses.forEach(response => {
          console.log('Image uploaded successfully:', response);
          let newArticlePicture: ArticlePicture = new ArticlePicture(response.secure_url);
          this.ad.articlePictures!.push(newArticlePicture);
          console.error('this.ad.articlePictures:: ', this.ad.articlePictures)
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
        // TODO: à enlever une fois la connexion implémentée
        this.ad.publisherId = 1;
        this.adService.postAd(this.ad).subscribe({
          next: (ad: AdResponse) => {
            console.log('Ad successfully created:: ');
            console.log(ad);
            this.scrollToTop()
            this.adSuccessfullySubmitted = true;
            this.disabledFields = true;
            setTimeout(() => {
              this.adSuccessfullySubmitted = false;
              this.disabledFields = false;
            }, 3000);
            setTimeout(() => {
              this.router.navigate(['compte/annonce/mon-annonce/', ad.id])
            }, 3000)
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

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0])
  }
}