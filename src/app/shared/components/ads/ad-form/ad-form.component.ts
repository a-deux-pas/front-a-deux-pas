import { Component, Input, ElementRef, Renderer2, AfterViewChecked, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { DisplayManagementService } from '../../../services/display-management.service';
import { Subscription } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, Location } from '@angular/common'
import { ArticleState } from '../../../models/enum/article-state.enum';
import { Category } from '../../../models/enum/category.enum';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { Subcategory } from '../../../models/enum/subcategory.enum';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AdFormService } from './ad-form.service';
import { escapeHtml } from '../../../utils/sanitizers/custom-sanitizers';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigService } from '../../../services/dropzone-config.service';
import { ALERTS } from '../../../utils/constants/alert-constants';
import { AdService } from '../../../services/ad.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
  standalone: true,
  imports: [FormsModule, NgSelectModule, NgClass, NgbCarousel, NgbSlide, DropzoneModule]
})
export class AdFormComponent implements AfterViewChecked {
  @Input() formTitle!: string;
  @Input() isCreateAdForm!: boolean;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;
  ad!: AdDetails;
  adSubscription!: Subscription;
  userId: number = Number(localStorage.getItem('userId'));
  selectedPicNumber: number = 2;
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  subcategoryEnum = Subcategory;
  categoryEnum = Category;
  hasInteractedWithDropzone: boolean = false;
  isSubmitting: boolean = false;

  @ViewChildren('desktopDropzone') desktopDropzones!: QueryList<DropzoneComponent>;
  @ViewChildren('mobileDropzone') mobileDropzones!: QueryList<DropzoneComponent>;
  @ViewChild('dropzoneContainer') dropzoneContainer!: ElementRef;
  articlePictures: File[] = [];
  config: DropzoneConfigInterface;
  customMessage: string = `
    <div class="dropzone-add">
      <img src="assets/icons/buttons/add-orange.webp" alt="Icône d'ajout de photo" class="dropzone-icon" />
      <span>ajouter une photo</span>
    </div>
  `;

  constructor(
    private adformService: AdFormService,
    private router: Router,
    private route: ActivatedRoute,
    private adService: AdService,
    private displayManagementService: DisplayManagementService,
    private location: Location,
    private el: ElementRef,
    private renderer: Renderer2,
    private dropzoneConfigService: DropzoneConfigService,
  ) {
    this.ad = new AdDetails(
      0, // id
      '',  // title
      '', // category
      '', // subcategory
      '',  // articleDescription
      '',  // articleState
      0,   // price
      this.userId // publisherId
    );
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
      this.initializeDropzones();
    });
    this.config = this.dropzoneConfigService.getConfig();
  }

  ngOnInit(): void {
    if (!this.isCreateAdForm) {
      this.adSubscription = this.adService.myAd$.subscribe(
        currentAd => {
          if (currentAd) {
            this.ad = { ...currentAd };
            this.selectedPicNumber = this.ad.articlePictures?.length ?? 2;
            if (this.ad.articlePictures && this.ad.articlePictures.length > 0) {
              this.convertUrlsToFiles(this.ad.articlePictures);
            }
          } else {
            const adId = Number(this.route.snapshot.paramMap.get('adId'));
            this.getAd(adId);
          }
        });
    }
  }

  ngAfterViewChecked(): void {
    this.config = this.dropzoneConfigService.getConfig();
    if (this.isBigScreen) {
      this.updateDropzoneDimension(this.selectedPicNumber, true);
      // this.dropzoneConfigService.setThumbnailDimensions(400, 400);
    } else {
      this.updateDropzoneDimension(this.selectedPicNumber, false);
      // this.dropzoneConfigService.setThumbnailDimensions(649, 600);
    }
    this.updateArticlePicture();
  }

  getAd(adId: number) {
    this.adService.getAdById(adId, 0).subscribe((ad: AdDetails) => {
      this.ad = { ...ad };
      this.selectedPicNumber = this.ad.articlePictures?.length ?? 2;
      if (this.ad.articlePictures && this.ad.articlePictures.length > 0) {
        this.convertUrlsToFiles(this.ad.articlePictures);
      }
    }
    );
  }

  private convertUrlsToFiles(urls: string[]): void {
    // promise handles urls one by one
    Promise.all(
      urls.map(url => fetch(url) // Fetch the content from the URL
        .then(res => res.blob()) // Convert the response to a Blob
        .then(blob => {
          // Extract the file name from the URL or use a default name
          const fileName = url.split('/').pop() ?? 'image.webp';
          // Create a File object from the Blob and return it
          return new File([blob], fileName, { type: blob.type });
        })
        .catch(error => {
          console.error(`Error fetching image from ${url}:`, error);
          return null;
        })
      )
    ).then(files => {
      // Filter out any null values and cast the result to File[]
      this.articlePictures = files.filter(file => file !== null) as File[];
      this.initializeDropzones();
    });
  }

  private initializeDropzones(): void {
    setTimeout(() => {
      const dropzones = this.isBigScreen ? this.desktopDropzones : this.mobileDropzones;
      dropzones?.forEach((dropzoneComp, index) => {
        const dropzone = dropzoneComp.directiveRef?.dropzone();
        if (dropzone) {
          dropzone.removeAllFiles(true);
          if (this.articlePictures[index]) {
            dropzone.addFile(this.articlePictures[index]);
          }
        }
      });
    });
  }

  updateArticlePicture(): void {
    const dropzones = this.isBigScreen ? this.desktopDropzones : this.mobileDropzones;
    dropzones.forEach((dropzoneComp: DropzoneComponent, index: number) => {
      const dropzone = dropzoneComp.directiveRef?.dropzone();
      if (dropzone) {
        dropzone.on('thumbnail', (addedFile: File) => {
          const fileExistsInArray = this.articlePictures.some(file => file === addedFile);
          if (!fileExistsInArray) {
            if (index === 0) {
              this.articlePictures.unshift(addedFile);
              this.updateDropzoneDimension(this.selectedPicNumber, this.isBigScreen!)
            } else {
              this.articlePictures.push(addedFile);
              this.updateDropzoneDimension(this.selectedPicNumber, this.isBigScreen!)
            }
          }
        });
        dropzone.on('removedfile', (removedfile: File) => {
          const indexToRemove = this.articlePictures.findIndex(file => file === removedfile);
          if (indexToRemove !== -1) {
            this.articlePictures.splice(indexToRemove, 1);
          }
        });
      }
    });
  }

  updateDropzoneDimension(dropzoneCount: number, isBigScreen: boolean) {
    let dropzoneClass: string = '';
    const dropzones = this.el.nativeElement.querySelectorAll('.articlePicDropzones');
    dropzones.forEach((dropzone: any) => {
      this.renderer.removeClass(dropzone, 'two-dropzones');
      this.renderer.removeClass(dropzone, 'three-dropzones');
      this.renderer.removeClass(dropzone, 'four-dropzones');
      this.renderer.removeClass(dropzone, 'five-dropzones');
      this.renderer.removeClass(dropzone, 'mobile-dropzones');
    });
    if (dropzones.length > 0) {
      if (isBigScreen) {
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
      } else {
        dropzoneClass = 'mobile';
        let carousselInner = this.el.nativeElement.querySelector('.carousel-inner');
        this.renderer.setStyle(carousselInner, 'overflow', 'visible');
        let carouselElement = document.querySelector('ngb-carousel');
        this.renderer.setStyle(carouselElement, 'width', '350px');
        this.renderer.setStyle(carouselElement, 'margin', '0 auto');
      }
    }
    let newClass: string = `${dropzoneClass}-dropzones`;
    dropzones.forEach((dropzone: any) => {
      this.renderer.addClass(dropzone, `${newClass}`);
      const dropzoneWidth = dropzone.clientWidth;
      const dropzoneHeight = dropzone.clientHeight;

      if (dropzoneWidth !== 0 && dropzoneHeight !== 0) {
        this.config = this.dropzoneConfigService.getConfig(dropzoneWidth + 300, dropzoneHeight + 300);
        const imgThumbnail = dropzone.querySelector('[data-dz-thumbnail]');
        if (imgThumbnail) {
          this.renderer.setStyle(imgThumbnail, 'width', `${dropzoneWidth}px`);
          this.renderer.setStyle(imgThumbnail, 'height', `${dropzoneHeight}px`);
        }
      }
    });
    const dzWrapper = this.el.nativeElement.querySelectorAll('.dz-wrapper');
    dzWrapper.forEach((wrapper: any) => {
      this.renderer.setStyle(wrapper, 'overflow', 'visible');
    });
  }

  onDropzoneInteraction(): void {
    this.hasInteractedWithDropzone = true;
  }

  // image selection carrousel for mobile device
  togglePaused() {
    this.displayManagementService.togglePaused()
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.displayManagementService.onSlide(slideEvent)
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

  getArray(length: number): any[] {
    return Array.from({ length }, (_, index) => index);
  }

  goBack() {
    this.location.back();
  }

  sanitizeTheInputs() {
    escapeHtml(this.ad.title)
    escapeHtml(this.ad.articleDescription)
  }

  onSubmit() {
    if (this.isSubmitting) return; // Avoids multiple submissions
    this.isSubmitting = true;
    this.sanitizeTheInputs();
    this.ad.subcategory = this.ad.category == this.categoryEnum.OTHER_CATEGORY ?
      Subcategory.OTHER_SUBCATEGORY : this.ad.subcategory;
    const adJson = JSON.stringify(this.ad)
    const adBlob = new Blob([adJson], {
      type: 'application/json'
    })
    const adData: FormData = new FormData();
    adData.append('adInfo', adBlob);
    this.articlePictures.forEach((file, index) => {
      adData.append(`adPicture-${index + 1}`, file);
    });
    if (this.isCreateAdForm) {
      this.createAd(adData);
    } else {
      this.updateAd(adData);
    }
  }

  private createAd(adData: FormData): void {
    this.adformService.createAd(adData).subscribe({
      next: (ad: AdDetails) => {
        this.isSubmitting = false;
        this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
        setTimeout(() => {
          this.displayManagementService.displayAlert(
            ALERTS.AD_CREATED_SUCCESS
          );
        }, 100);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (error.status == 413) {
          this.displayManagementService.displayAlert(
            ALERTS.UPLOAD_PICTURE_ERROR
          );
        } else {
          this.displayManagementService.displayAlert(
            ALERTS.DEFAULT_ERROR,
          );
        }
      }
    });
  }

  private updateAd(adData: FormData): void {
    this.adformService.updateAd(adData).subscribe({
      next: (ad: AdDetails) => {
        this.isSubmitting = false;
        this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
        setTimeout(() => {
          this.displayManagementService.displayAlert(
            ALERTS.AD_UPDATED_SUCCESS
          );
        }, 100);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (error.status == 413) {
          this.displayManagementService.displayAlert(
            ALERTS.UPLOAD_PICTURE_ERROR
          );
        } else {
          this.displayManagementService.displayAlert(
            ALERTS.DEFAULT_ERROR,
          );
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.windowSizeSubscription) {
      this.windowSizeSubscription.unsubscribe();
    }
    if (this.adSubscription) {
      this.adSubscription.unsubscribe();
    }
  }
}