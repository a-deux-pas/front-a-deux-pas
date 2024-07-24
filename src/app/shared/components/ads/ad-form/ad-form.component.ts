import { Component, Input, OnInit } from '@angular/core';
import { UploadPictureService } from '../../../services/upload-picture.service';
import { DisplayManagementService } from '../../../services/display-management.service';
import { ArticlePicture } from '../../../models/ad/article-picture.model';
import { Observable, Subscription, catchError, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, Location } from '@angular/common'
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { Subcategory } from '../../../models/enum/subcategory.enum';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AdFormService } from './ad-form.service';
import { escapeHtml } from '../../../utils/sanitizers/custom-sanitizers';
import { ALERTS } from '../../../utils/constants/alert-constants';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { AdService } from '../../../services/ad.service';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    NgSelectModule,
    NgxDropzoneModule,
    NgClass,
    NgbCarousel,
    NgbSlide
  ]
})
export class AdFormComponent implements OnInit {
  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;
  ad!: AdDetails;
  adSubscription!: Subscription;
  userId: number = Number(localStorage.getItem('userId'));
  today: Date = new Date()
  selectedPicNumber: number = 2;
  articlePictures: File[] = [];
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  subcategoryEnum = Subcategory;
  categoryEnum = Category;

  constructor(
    private adformService: AdFormService,
    private adService: AdService,
    private uploadPictureService: UploadPictureService,
    private router: Router,
    private route: ActivatedRoute,
    private displayManagementService: DisplayManagementService,
    private location: Location
  ) {
    this.ad = new AdDetails(
      0, // id
      '',  // title
      '', // category
      '', // subcategory
      '',  // articleDescription
      '',  // articleState
      0,   // price
      this.userId  // publisherId
    );
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  ngOnInit(): void {
    if (!this.isCreateAdForm) {
      this.adSubscription = this.adService.myAd$.subscribe(
        currentAd => {
          if (currentAd) {
            this.ad = { ...currentAd };
          } else {
            // TO DO: user id à supprimer lorsque PR de fix mergé
            const adId = Number(this.route.snapshot.paramMap.get(('adId')));
            this.getAd(adId, this.userId);
          }
      });
    }
  }

  getAd(adId: number, userId: number) {
    this.adService.getAdById(adId, userId).subscribe((ad: AdDetails) => {
        this.ad = { ...ad };
      }
    );
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
      const currentSubCategory = currentCategory.subCategories.find((subCat: { name: Subcategory }) => subCat.name === this.ad.subcategory);
      if (currentSubCategory) {
        return currentSubCategory.gender;
      }
    }
    return [];
  }

  resetChoices() {
    this.ad.subcategory = undefined;
    this.ad.articleGender = undefined;
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
        this.displayManagementService.displayAlert(
          ALERTS.UPLOAD_PICTURE_ERROR,
        );
        throw error; // TO DO: @erika, je te laisse voir si cela est nécéssaire au moment du fix cloudinary
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

  sanitizeTheInputs() {
    escapeHtml(this.ad.title)
    escapeHtml(this.ad.articleDescription)
  }

  // TO DO : a revoir (fix Cloudinary branch)
  onSubmit() {
    this.sanitizeTheInputs();
    this.ad.subcategory = this.ad.category == this.categoryEnum.OTHER_CATEGORY ?
      Subcategory.OTHER_SUBCATEGORY : this.ad.subcategory;
    if (this.isCreateAdForm) {
      this.createAd();
    } else {
      this.updateAd();
    }
  }

  private createAd(): void {
    this.uploadArticlePictures().subscribe({
      next: () => {
        this.ad.creationDate = this.today.toISOString();
        this.adformService.createAd(this.ad).subscribe({
          next: (ad: AdDetails) => {
            this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
            setTimeout(() => {
              this.displayManagementService.displayAlert(
                ALERTS.AD_CREATED_SUCCESS
              );
            }, 100);
          },
          error: () => {
            this.displayManagementService.displayAlert(
              ALERTS.DEFAULT_ERROR,
            );
          }
        });
      }
    });
  }

  private updateAd(): void {
    this.uploadArticlePictures().subscribe({
      next: () => {
        this.adformService.updateAd(this.ad).subscribe({
          next: (ad: AdDetails) => {
            this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
            setTimeout(() => {
              this.displayManagementService.displayAlert(
                ALERTS.AD_UPDATED_SUCCESS
              );
            }, 100);
          },
          error: () => {
            this.displayManagementService.displayAlert(
              ALERTS.DEFAULT_ERROR,
            );
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.windowSizeSubscription.unsubscribe();
    if (this.adSubscription) {
      this.adSubscription.unsubscribe();
    }
  }
}
