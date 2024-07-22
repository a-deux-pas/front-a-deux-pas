import { Component, Input, ElementRef, Renderer2, AfterViewChecked, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { DisplayManagementService } from '../../../services/display-management.service';
import { Subscription } from 'rxjs';
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
import { escapeHtml } from '../../../utils/sanitizers/custom-sanitizers';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigService } from '../../../services/dropzone-config.service';
import { ALERTS } from '../../../utils/constants/alert-constants';

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
  ad = new AdDetails(
    false, 1, "", 2, "", "", "", ""
  );
  selectedPicNumber: number = 2;
  states = Object.values(ArticleState);
  categories = Object.values(Category);
  disabledFields: boolean = false;
  // TODO :: checker à quoi ca sert
  hasInteractedWithDropzone: boolean = false;
  @ViewChildren(DropzoneComponent) dropzoneComponents!: QueryList<DropzoneComponent>;
  @ViewChild('dropzoneContainer') dropzoneContainer!: ElementRef;
  articlePictures: File[] = [];
  // TODO :: variabiliser thumbnailWidth et thumbnailHeight ?
  config: DropzoneConfigInterface;
  configMobile: DropzoneConfigInterface;
  customMessage: string = `
    <div class="dropzone-add">
      <img src="assets/icons/buttons/add-orange.webp" alt="Icône d'ajout de photo" class="dropzone-icon" />
      <span>ajouter une photo</span>
    </div>
  `;

  constructor(
    private adformService: AdFormService,
    private router: Router,
    private displayManagementService: DisplayManagementService,
    private location: Location,
    private el: ElementRef,
    private renderer: Renderer2,
    private dropzoneConfigService: DropzoneConfigService,
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
    this.config = this.dropzoneConfigService.getConfig();
    this.configMobile = this.dropzoneConfigService.getConfigMobile();

  }

  ngAfterViewChecked(): void {
    this.dropzoneConfigService.setThumbnailDimensions(400, 400);
    this.config = this.dropzoneConfigService.getConfig();
    if (this.isBigScreen) {
      this.updateDropzoneDimension(this.selectedPicNumber);
    }
    this.updateArticlePicture()
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

  updateArticlePicture(): void {
    if (this.dropzoneContainer) {
      this.dropzoneComponents.forEach((dropzoneComp: DropzoneComponent, index: number) => {
        const dropzone = dropzoneComp.directiveRef?.dropzone();
        if (dropzone) {
          dropzone.on('thumbnail', (addedFile: File) => {
            const fileExistsInArray = this.articlePictures.some(file => file === addedFile);
            if (!fileExistsInArray) {
              if (index === 0) {
                this.articlePictures.unshift(addedFile);
              } else {
                this.articlePictures.push(addedFile);
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
  }

  getArray(length: number): any[] {
    return Array.from({ length }, (_, index) => index);
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
    }
  }

  // TODO  :: à virer ?
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

  goBack() {
    this.location.back();
  }

  sanitizeTheInputs() {
    escapeHtml(this.ad!.title!)
    escapeHtml(this.ad!.articleDescription!)
  }

  onSubmit() {
    this.sanitizeTheInputs();
    this.ad!.subcategory = this.ad!.category == "Autre" ?
      Subcategory.OTHER_SUBCATEGORY :
      this.ad!.subcategory.name;
    this.ad.publisherId = Number(localStorage.getItem('userId')!);
    this.adformService.postAd(this.ad!, this.articlePictures).subscribe({
      next: (ad: AdDetails) => {
        this.router.navigate(['compte/annonces/mon-annonce/', ad.id]);
        setTimeout(() => {
          this.displayManagementService.displayAlert(
            ALERTS.AD_CREATED_SUCCES
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

  ngOnDestroy() {
    this.windowSizeSubscription.unsubscribe();
  }
}
