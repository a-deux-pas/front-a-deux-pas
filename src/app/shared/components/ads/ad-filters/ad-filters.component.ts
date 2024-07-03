import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ArticleState } from '../../../models/enum/article-state.enum';
import { PriceRange } from '../../../models/enum/price-range.enum';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdFiltersService } from './ad-filters.service';
import { Categories } from '../../../utils/constants/categories-arrangement';
import { CommonModule } from '@angular/common';
import { CityAndPostalCodeResponse } from '../../../models/user/city-and-postal-code-response.model';

@Component({
  selector: 'app-ad-filters',
  templateUrl: './ad-filters.component.html',
  styleUrl: './ad-filters.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class AdFiltersComponent {
  isBigScreen: boolean = true;

  // selected filters
  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategory: string = 'Catégorie';
  uniqueCitiesAndPostalCodes: string[] = [];

  @Input() pageNumber: number = 0;
  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() filtersUpdated: EventEmitter<any> = new EventEmitter<{
    selectedPriceRanges: string[];
    selectedCities: string[];
    selectedArticleStates: string[];
    selectedCategory: string;
  }>();
  @Input() loggedInUserCity!: string | null;

  // initializing values for template use
  articleStates = Object.values(ArticleState);
  priceRanges = Object.values(PriceRange);
  categories = Categories;

  @ViewChild('priceDropdownRef') priceDropdownRef: any;
  @ViewChild('cityDropdownRef') cityDropdownRef: any;
  @ViewChild('categoryDropdownRef') categoryDropdownRef: any;
  @ViewChild('stateDropdownRef') stateDropdownRef: any;

  constructor(
    private adFiltersService: AdFiltersService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.handleDropdownMouseLeave(this.priceDropdownRef.nativeElement);
    this.handleDropdownMouseLeave(this.cityDropdownRef.nativeElement);
    this.handleDropdownMouseLeave(this.categoryDropdownRef.nativeElement);
    this.handleDropdownMouseLeave(this.stateDropdownRef.nativeElement);
    this.fetchCitiesAndPostalCodes();
  }

  isCheckedCity(cityAndPostalCode: string): boolean {
    // check the user's city if they are logged in
    if (this.loggedInUserCity && this.loggedInUserCity === cityAndPostalCode) {
      this.selectedCities.push(this.loggedInUserCity);
      return true;
    } else {
      return this.selectedCities.includes(cityAndPostalCode);
    }
  }

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
  }

  // handling the category filter at each click on either the category, subcategory or gender value
  handleCategoryFilterSelection(
    category: string,
    subCategory: string | undefined,
    gender: string | undefined
  ) {
    this.pageNumber = 0;
    this.pageNumberChange.emit(this.pageNumber);
    this.setSelectedCategoryValue(subCategory, gender, category);
    this.notifyFiltersUpdated();
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

  // method to keep the dropdown menus visible for a short period after the mouse leaves the parent div
  private handleDropdownMouseLeave(dropdownElement: HTMLElement) {
    this.renderer.listen(dropdownElement, 'mouseleave', () => {
      const dropdownMenu = dropdownElement.querySelector('.dropdown-menu');
      this.renderer.addClass(dropdownMenu, 'keep-visible');
      setTimeout(() => {
        this.renderer.removeClass(dropdownMenu, 'keep-visible');
      }, 40); // tweak this value to see the difference
    });
  }

  // assigns a value to the selectedCategory variable, based on user selection
  private setSelectedCategoryValue(
    subCategory: string | undefined,
    gender: string | undefined,
    category: string
  ) {
    if (subCategory) {
      if (gender) {
        this.selectedCategory = category + ' ▸ ' + subCategory + ' ▸ ' + gender;
      } else {
        this.selectedCategory = category + ' ▸ ' + subCategory;
      }
    } else {
      this.selectedCategory = category;
    }
  }

  fetchCitiesAndPostalCodes() {
    this.adFiltersService
      .fetchCitiesAndPostalCodes()
      .subscribe((citiesAndPostalCodes: any) => {
        this.formatCitiesAndPostalCodesForDisplay(citiesAndPostalCodes);
      });
  }

  private formatCitiesAndPostalCodesForDisplay(
    citiesAndPostalCodes: CityAndPostalCodeResponse[]
  ) {
    citiesAndPostalCodes.forEach((cityAndPostalCode) =>
      this.uniqueCitiesAndPostalCodes.push(
        // formatting the string used in the 'City' filter template to display : 'City (postal code)'
        `${cityAndPostalCode.city} (${cityAndPostalCode.postalCode})`
      )
    );
    // Sort the uniqueCitiesAndPostalCodes array using localeCompare for reliable alphabetical sorting
    this.uniqueCitiesAndPostalCodes.sort((a, b) => a.localeCompare(b));
  }
}
