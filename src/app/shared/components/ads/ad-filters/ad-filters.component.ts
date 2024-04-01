import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ArticleState } from '../../../models/enum/ArticleState';
import { PriceRange } from '../../../models/enum/PriceRange';
import { AdResponse } from '../../../models/AdResponse.model';
import { AdFiltersService } from './ad-filters.service';
import { Categories } from '../../../utils/constants/Categories';

@Component({
  selector: 'app-ad-filters',
  templateUrl: './ad-filters.component.html',
  styleUrl: './ad-filters.component.scss',
})
export class AdFiltersComponent {
  isBigScreen: boolean = true;

  // selected filters
  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategory: string = 'Catégorie';

  @Input() displayedAds: AdResponse[] = [];
  @Input() uniqueCitiesAndPostalCodes: string[] = [];
  @Input() pageNumber: number = 0;
  pageSize: number = 8;
  @Output() displayedAdsChange: EventEmitter<AdResponse[]> = new EventEmitter<
    AdResponse[]
  >();
  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() filtersUpdated: EventEmitter<any> = new EventEmitter<{
    selectedPriceRanges: string[];
    selectedCities: string[];
    selectedArticleStates: string[];
    selectedCategory: string;
  }>();

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
    this.pageNumber = 0;
    this.pageNumberChange.emit(this.pageNumber);
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

    this.pageNumber = 0;
    this.pageNumberChange.emit(this.pageNumber);
    this.notifyFiltersUpdated();

    this.fetchFilteredAds();
  }

  // handling the category filter at each click on either the category, subcategory or gender value
  handleCategoryFilterSelection(
    category: string,
    subCategory: string | undefined,
    gender: string | undefined
  ) {
    this.pageNumber = 0;
    this.pageNumberChange.emit(this.pageNumber);
    this.selectedCategory = subCategory
      ? gender
        ? category + ' ▸ ' + subCategory + ' ▸ ' + gender
        : category + ' ▸ ' + subCategory
      : category;

    this.notifyFiltersUpdated();
    this.fetchFilteredAds();
  }

  // re-initializing the filters
  resetFilter(filter: string) {
    switch (filter) {
      case 'price':
        this.resetCheckboxesAndSelection(
          '#price-dropdown input[type="checkbox"]',
          this.selectedPriceRanges
        );
        break;
      case 'city':
        this.resetCheckboxesAndSelection(
          '#city-dropdown input[type="checkbox"]',
          this.selectedCities
        );
        break;
      case 'articleState':
        this.resetCheckboxesAndSelection(
          '#state-dropdown input[type="checkbox"]',
          this.selectedArticleStates
        );
        break;
      case 'category':
        this.selectedCategory = 'Catégorie';
        break;
    }
    this.pageNumber = 0;
    this.pageNumberChange.emit(this.pageNumber);
    this.notifyFiltersUpdated();
    this.fetchFilteredAds();
  }

  // clearing all checkboxes for the selected http element (by its #id) and emptying its filter array
  private resetCheckboxesAndSelection(
    selector: string,
    selectedFilterValues: string[]
  ) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(selector);
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
    selectedFilterValues.length = 0;
  }

  // calling the service method that makes the api call to fetch the filtered ads
  private fetchFilteredAds() {
    this.adFiltersService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategory,
        this.pageNumber,
        this.pageSize
      )
      .subscribe((filteredAds: AdResponse[]) => {
        // updating the 'displayedAds' variable
        this.displayedAds = filteredAds;
        // signaling to the parent component (ad-list) that the 'displayedAds' variable was updated
        this.displayedAdsChange.emit(this.displayedAds);
      });
  }

  // adding or removing values from a filter array, based on their checked or unchecked status
  private updateSelectedFilterArray(
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

  private notifyFiltersUpdated() {
    const eventData = {
      selectedPriceRanges: this.selectedPriceRanges,
      selectedCities: this.selectedCities,
      selectedArticleStates: this.selectedArticleStates,
      selectedCategory: this.selectedCategory,
    };
    this.filtersUpdated.emit(eventData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = event.target.innerWidth > 1200;
  }
}
