import { Component, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';
import { AdFiltersService } from '../ad-filters/ad-filters.service';
import { CityAndPostalCodeResponse } from '../../../models/user/city-and-postal-code-response.model';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { AdFiltersComponent } from '../ad-filters/ad-filters.component';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  standalone: true,
  imports: [AdCardComponent, AdFiltersComponent],
})
export class AdListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 8;
  displayedAds: AdHomeResponse[] = [];
  noMoreAds: boolean = false;
  uniqueCitiesAndPostalCodes: string[] = [];

  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategory: string = 'Catégorie';

  constructor(
    private adListService: AdListService,
    private adFiltersService: AdFiltersService
  ) {}

  ngOnInit() {
    this.fetchCitiesAndPostalCodes();
    this.fetchPaginatedAdsList();
  }

  fetchCitiesAndPostalCodes() {
    this.adListService
      .fetchCitiesAndPostalCodes()
      .subscribe((citiesAndPostalCodes: any) => {
        this.formatCitiesAndPostalCodesForDisplay(citiesAndPostalCodes);
      });
  }

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  fetchPaginatedAdsList() {
    this.adFiltersService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategory,
        this.pageNumber,
        this.pageSize
      )
      .subscribe((ads: AdHomeResponse[]) => {
        this.displayedAds = [...this.displayedAds, ...ads];
        this.noMoreAds = ads.length <= 0;
      });
  }

  receiveUpdatedFilters(eventData: {
    selectedPriceRanges: string[];
    selectedCities: string[];
    selectedArticleStates: string[];
    selectedCategory: string;
  }) {
    this.selectedPriceRanges = eventData.selectedPriceRanges;
    this.selectedCities = eventData.selectedCities;
    this.selectedArticleStates = eventData.selectedArticleStates;
    this.selectedCategory = eventData.selectedCategory;
    this.noMoreAds = false;
  }

  private formatCitiesAndPostalCodesForDisplay(
    citiesAndPostalCodes: CityAndPostalCodeResponse[]
  ) {
    citiesAndPostalCodes.forEach((cityAndPostalCode) =>
      this.uniqueCitiesAndPostalCodes.push(
        // formatting the string used in the 'City' filter template to display : 'City (postal code)'
        cityAndPostalCode.city
          .concat(' (')
          .concat(cityAndPostalCode.postalCode)
          .concat(')')
      )
    );
    // Sort the uniqueCitiesAndPostalCodes array using localeCompare for reliable alphabetical sorting
    this.uniqueCitiesAndPostalCodes.sort((a, b) => a.localeCompare(b));
  }
}
