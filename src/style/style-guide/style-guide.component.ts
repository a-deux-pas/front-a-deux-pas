import { Component, HostListener } from '@angular/core';
//Component to import to use a modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilsService } from '../../app/shared/services/utils-service';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule]
})
export class StyleGuideComponent {

  //Component to import to use a modal
  constructor(
    private modalService: NgbModal,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize(): boolean {
    return this.isBigScreen == this.utilsService.onResize();
  }

  isBigScreen: boolean = true;
  selectedDay!: number;
  selectedTimes = [];
  selectedState = [];
  selectedCatFilter: string | undefined;

  // Select data
  days = [
    { id: 1, name: 'Lundi' },
    { id: 2, name: 'Mardi' },
    { id: 3, name: 'Mercredi' },
    { id: 4, name: 'Jeudi' },
    { id: 5, name: 'Vendredi' },
    { id: 6, name: 'Samedi' },
    { id: 7, name: 'Dimanche' },
    { id: 8, name: 'Tous les jours' },
  ];

  // Multiselect data
  // See more example here : https://ng-select.github.io/ng-select#/multiselect-checkbox
  time = [
    { id: 1, name: '8h-9h', selectedAll: 'Tous' },
    { id: 2, name: '9h-10h', selectedAll: 'Tous' },
    { id: 3, name: '10h-11h', selectedAll: 'Tous' },
    { id: 4, name: '11h-12h', selectedAll: 'Tous' },
    { id: 5, name: '12h-13h', selectedAll: 'Tous' },
    { id: 6, name: '13h-14h', selectedAll: 'Tous' },
    { id: 7, name: '14h-15h', selectedAll: 'Tous' },
    { id: 8, name: '15h-16h', selectedAll: 'Tous' },
    { id: 9, name: '16h-17h', selectedAll: 'Tous' },
    { id: 10, name: '17h-18h', selectedAll: 'Tous' },
    { id: 11, name: '18h-19h', selectedAll: 'Tous' },
    { id: 12, name: '19h-20h', selectedAll: 'Tous' },
    { id: 13, name: '20h-21h', selectedAll: 'Tous' },
    { id: 14, name: '21h-22h', selectedAll: 'Tous' },
  ];

  // Dropdown with checkbox data
  states = [
    { id: 1, name: 'Neuf avec étiquette' },
    { id: 2, name: 'Neuf sans étiquette' },
    { id: 3, name: 'Très bon état' },
    { id: 4, name: 'Bon état' },
    { id: 5, name: 'Satisfaisant' },
  ];

  // Dropdown with radiobox data
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
      id: 2, name: 'Loisirs', subCategories: [
        { id: 7, name: 'Livres' },
        { id: 8, name: 'Musique' },
        { id: 9, name: 'Films' },
        { id: 10, name: 'Sport' },
        { id: 11, name: 'Autre' },
      ]
    }
  ]

  // Card data
  dummyArticle: any = {
    title: 'Coque de téléphone',
    image: '/assets/pictures/mobile.webp',
    seller: 'Eri',
    price: '30'
  };

  // Method to open a modal
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  // Method to select category filter
  // Mircea : to rename once you've finalised your method as this bit of code just gives you your search terms ;)
  methodToFilter(genderName: string | undefined, subCategoryName: string) {
    this.selectedCatFilter = genderName ?? subCategoryName;
    console.log(' subCategoryName ', subCategoryName, 'genderName ', genderName)
  }
}
