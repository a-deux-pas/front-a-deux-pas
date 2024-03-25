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
import { Categories } from '../../../utils/constants/Categories';

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

  // initializing values for template use
  articleStates = Object.values(ArticleState);
  priceRanges = Object.values(PriceRange);
  categories = Categories;

  // injecting the filter service
  constructor(private adFiltersService: AdFiltersService) {}

  // handling the checkbox filters every time any of the checkboxes are changed (checked / unchecked)
  handleCheckboxFiltersSelection(
    filterType: string,
    value: string,
    event: Event | undefined
  ) {
    const checkbox = event?.target as HTMLInputElement;
    switch (filterType) {
      case 'priceRange':
        this.updateSelectedFilterArray(
          this.selectedPriceRanges,
          value,
          checkbox.checked
        );
        break;
      case 'city':
        this.updateSelectedFilterArray(
          this.selectedCities,
          value,
          checkbox.checked
        );
        break;
      case 'articleState':
        this.updateSelectedFilterArray(
          this.selectedArticleStates,
          value,
          checkbox.checked
        );
        break;
    }
    this.fetchFilteredAds();
  }

  // handling the category filter at each click on either the category, subcategory or gender value
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

  // calling the service method that makes the api call to fetch the filtered ads
  private fetchFilteredAds() {
    this.adFiltersService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategory
      )
      .subscribe((filteredAds: HomePageAd[]) => {
        // updating the 'displayedAds' variable
        this.displayedAds = filteredAds;
        // signaling to the parent component (ad-list) that the 'displayedAds' variable was updated
        this.displayedAdsChange.emit(this.displayedAds);
      });
  }

  // adding or removing values from a filter array, based on their checked or unchecked status
  updateSelectedFilterArray(
    array: string[],
    value: string,
    isChecked: boolean
  ) {
    if (isChecked) {
      array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = event.target.innerWidth > 1200;
  }
}
