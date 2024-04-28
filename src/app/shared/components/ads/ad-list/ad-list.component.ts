import { Component, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { AdResponse } from '../../../models/ad-response.model';
import { AdFiltersService } from '../ad-filters/ad-filters.service';
import { CityAndPostalCodeResponse } from '../../../models/city-and-postal-code-response.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  // styleUrl: './ad-list.component.scss',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 8;
  displayedAds: AdResponse[] = [];
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
      .subscribe((ads: AdResponse[]) => {
        this.displayedAds = [...this.displayedAds, ...ads];
        this.noMoreAds = ads.length > 0 ? false : true;
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
    this.uniqueCitiesAndPostalCodes.sort();
  }
}
