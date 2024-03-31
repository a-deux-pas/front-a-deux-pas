import { Component, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { AdResponse } from '../../../models/AdResponse.model';
import { AdFiltersService } from '../ad-filters/ad-filters.service';
import { CityAndPostalCodeResponse } from '../../../models/CityAndPostalCodeResponse.model';

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
  uniqueCitiesAndPostalCodes: Set<string> = new Set();

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
        this.extractUniqueCitiesAndPostalCodes(citiesAndPostalCodes);
      });
    console.log(this.uniqueCitiesAndPostalCodes);
    this.pageSize = 8;
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
      });
  }

  private extractUniqueCitiesAndPostalCodes(
    citiesAndPostalCodes: CityAndPostalCodeResponse[]
  ) {
    citiesAndPostalCodes.forEach((cityAndPostalCode) =>
      this.uniqueCitiesAndPostalCodes.add(
        // formatting the string used in the 'City' filter template to display : 'City (postal code)'
        cityAndPostalCode.city
          .concat(' (')
          .concat(cityAndPostalCode.postalCode)
          .concat(')')
      )
    );
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
  }

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }
}
