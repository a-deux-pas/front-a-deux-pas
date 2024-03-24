import { Component, Input, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Ad } from '../../../../model/ad.model';
import { User } from '../../../../model/user.model';
import { AdService } from '../../../../services/Ad.service';
import { UploadPictureService } from '../../../../services/upload-picture.service';
import { ArticlePicture } from '../../../../model/article-picture.model';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss',
})
export class AdFormComponent implements OnInit {

  isBigScreen: boolean | undefined
  isPostAdForm: boolean | undefined;

  ad: Ad = new Ad(
    1,
    '',
    '',
    new Date(),
    0,
    1,
    [],
    undefined,
    undefined,
    '',
    undefined,
  );
  user!: User;
  publisher: User | undefined;
  today: Date = new Date()
  selectedPicNumber: number = 1;
  articlePictures: File[] = [];
  states = [
    { id: 1, name: 'Neuf avec étiquette' },
    { id: 2, name: 'Neuf sans étiquette' },
    { id: 3, name: 'Très bon état' },
    { id: 4, name: 'Bon état' },
    { id: 5, name: 'Satisfaisant' },
  ];
  categories = [
    {
      id: 1, name: 'Mode', subCategories: [
        { id: 1, name: 'Hauts', gender: [{ id: 1, name: 'Femme' }, { id: 2, name: 'Homme' }] },
        { id: 2, name: 'Bas', gender: [{ id: 1, name: 'Femme' }, { id: 2, name: 'Homme' }] },
        { id: 3, name: 'Chaussures' },
        { id: 4, name: 'Manteau' },
        { id: 5, name: 'Accessoires' },
        { id: 6, name: 'Autre' },
      ]
    },
    {
      id: 2, name: 'Electronique', subCategories: [
        { id: 7, name: 'Ordinateur' },
        { id: 8, name: 'Téléphone' },
        { id: 9, name: 'Jeux video' },
        { id: 11, name: 'Autre' },
      ]
    },
    {
      id: 3, name: 'Maison', subCategories: [
        { id: 7, name: 'Meubles' },
        { id: 8, name: 'Décorations' },
        { id: 9, name: 'Jardin' },
        { id: 11, name: 'Autre' },
      ]
    },
    {
      id: 4, name: 'Loisirs', subCategories: [
        { id: 7, name: 'Livres' },
        { id: 8, name: 'Musique' },
        { id: 9, name: 'Films' },
        { id: 10, name: 'Sport' },
        { id: 11, name: 'Autre' },
      ]
    },
    {
      id: 4, name: 'Autre', subCategories: [
        { id: 11, name: 'Autre' },
      ]
    }
  ]

  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false


  // This HostListener listens for window resize events
  // When a resize event occurs, the onResize method is triggered
  // It takes the event object as a parameter
  // The isBigScreen property is updated based on the inner width of the event target
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = window.innerWidth > 1200;
  }

  // @Input() thisAd: Ad | undefined

  ngOnInit(): void {
    this.isBigScreen = window.innerWidth > 1200;
  }

  constructor(
    private adService: AdService,
    private uploadPictureService: UploadPictureService,
  ) { }


  // article category selection section

  getSubCategories() {
    const selectedCategory = this.categories.find(category => category.name === this.ad.category);
    return selectedCategory ? selectedCategory.subCategories : [];
  }

  getSubCategoriesGender() {
    const selectedCategory = this.categories.find(category => category.name === this.ad.category);
    if (selectedCategory) {
      const selectedSubCategory = selectedCategory.subCategories.find(subCategory => subCategory.name === this.ad.subcategory);
      return selectedSubCategory && selectedSubCategory.gender ? selectedSubCategory.gender : [];
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

  onRemove(file: File, dropzoneNumber: number) {
    const filesArray = this.getFilesArray(dropzoneNumber);
    filesArray.splice(filesArray.indexOf(file), 1);
  }

  onSelectPicture(event: { addedFiles: any; }, dropzoneNumber: number) {
    console.log(event)
    console.log(dropzoneNumber)
    const filesArray = this.getFilesArray(dropzoneNumber);
    filesArray.splice(0, filesArray.length);
    filesArray.push(...event.addedFiles);
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
    const observables: Observable<any>[] = [];
    const filesArrays: File[][] = [this.files1, this.files2, this.files3, this.files4, this.files5];

    filesArrays.forEach(filesArray => {
      if (filesArray.length > 0) {
        this.articlePictures.push(filesArray[0]);
      }
    });

    // upload of article pictures
    this.articlePictures.forEach(articlePic => {
      const data = new FormData();
      data.append('file', articlePic);
      data.append('upload_preset', 'adeupasProject');
      data.append('cloud_name', 'erikaadeuxpas');

      observables.push(this.uploadPictureService.uploadImage(data));
    });

    console.log('@@@@@@')
    console.table(this.articlePictures)
    console.log('@@@@@@')
    // forkJoin is used so that the following methods won't execute before its portion does
    return forkJoin(observables).pipe(
      tap((responses: any[]) => {
        responses.forEach(response => {
          console.log('Image uploaded successfully:', response);
          let newArticlePicture: ArticlePicture = new ArticlePicture(response.secure_url);
          this.ad.articlePictures.push(newArticlePicture);
        });
      }),
      catchError((error: any) => {
        console.error('Error occurred during image upload:', error);
        throw error;
      })
    );
  }

  onSubmit(): void {
    this.uploadArticlePictures().subscribe({
      next: () => {
        console.log('All images uploaded successfully');
        this.ad.creationDate = this.today;
        this.ad.publisherId = 1;
        this.adService.postAd(this.ad).subscribe({
          next: (ad: Ad) => {
            this.adSuccessfullySubmitted = true;
            setTimeout(() => {
              this.adSuccessfullySubmitted = false;
              //this.router.navigate(['/ads/detail', ad.id]);
            }, 3000);
            console.log('Ad successfully created');
            console.table(this.ad);
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

  // image selection carrousel for mobile device

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

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

}