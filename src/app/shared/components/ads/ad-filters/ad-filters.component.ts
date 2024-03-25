import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ArticleState } from '../../../models/enum/ArticleState';
import { PriceRange } from '../../../models/enum/PriceRange';
import { HomePageAd } from '../../../models/HomePageAd.model';
import { AdFiltersService } from './ad-filters.service';

@Component({
  selector: 'app-ad-filters',
  templateUrl: './ad-filters.component.html',
  styleUrl: './ad-filters.component.scss',
})
export class AdFiltersComponent {
  isBigScreen: boolean = true;

  @Input() displayedAds: HomePageAd[] = [];
  @Input() uniqueCitiesAndPostalCodes: string[] = [];
  @Output() displayedAdsChange: EventEmitter<HomePageAd[]> = new EventEmitter<
    HomePageAd[]
  >();

  // selected filters
  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategory: string = 'Catégorie';

  // extracting enum values for template use
  articleStates = Object.values(ArticleState);
  priceRanges = Object.values(PriceRange);

  // TODO : refactor this
  categories = [
    {
      id: 1,
      name: 'Mode',
      subCategories: [
        {
          id: 1,
          name: 'Hauts',
          gender: [
            { id: 1, name: 'Femme' },
            { id: 2, name: 'Homme' },
          ],
        },
        {
          id: 2,
          name: 'Bas',
          gender: [
            { id: 1, name: 'Femme' },
            { id: 2, name: 'Homme' },
          ],
        },
        { id: 3, name: 'Chaussures' },
        { id: 4, name: 'Manteau' },
        { id: 5, name: 'Accessoires' },
        { id: 6, name: 'Autre' },
      ],
    },
    {
      id: 2,
      name: 'Loisirs',
      subCategories: [
        { id: 7, name: 'Livres' },
        { id: 8, name: 'Musique' },
        { id: 9, name: 'Films' },
        { id: 10, name: 'Sport' },
        { id: 11, name: 'Autre' },
      ],
    },
  ];

  // injecting the filter service
  constructor(private adFiltersService: AdFiltersService) {}

  // handling filter selection
  handleCheckboxFiltersSelection(
    filterType: string,
    value: string,
    event: Event | undefined
  ) {
    const checkbox = event?.target as HTMLInputElement;
    switch (filterType) {
      case 'priceRange':
        this.updateSelectedArray(
          this.selectedPriceRanges,
          value,
          checkbox.checked
        );
        break;
      case 'city':
        this.updateSelectedArray(this.selectedCities, value, checkbox.checked);
        break;
      case 'articleState':
        this.updateSelectedArray(
          this.selectedArticleStates,
          value,
          checkbox.checked
        );
        break;
    }
    this.fetchFilteredAds();
  }

  // adding or removing values from a filter array, based on their checked or unchecked status
  updateSelectedArray(array: string[], value: string, isChecked: boolean) {
    if (isChecked) {
      array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }

  //Méthod to select category filter
  //Mircea : to rename once you've finalised your method as this bit of code just gives you your search terms ;)
  handleCategoryFilterSelection(
    category: string,
    subCategory: string | undefined,
    gender: string | undefined
  ) {
    this.selectedCategory = subCategory
      ? gender
        ? category + ' / ' + subCategory + ' / ' + gender
        : category + ' / ' + subCategory
      : category;

    this.fetchFilteredAds();
  }

  resetCategoryFilter() {
    this.selectedCategory = 'Catégorie';
    this.fetchFilteredAds();
  }

  private fetchFilteredAds() {
    this.adFiltersService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategory
      )
      .subscribe((filteredAds: HomePageAd[]) => {
        // updates the 'displayedAds' variable
        this.displayedAds = filteredAds;
        // signals to the parent component (ad-list) that the 'displayedAds' variable was updated
        this.displayedAdsChange.emit(this.displayedAds);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = event.target.innerWidth > 1200;
  }
}
