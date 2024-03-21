import { Component, HostListener, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { HomePageAd } from '../../../models/HomePageAd.model';
import { PriceRange } from '../../../models/enum/PriceRange';
import { ArticleState } from '../../../models/enum/ArticleState';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  // styleUrl: './ad-list.component.scss',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  selectedCatFilter: string | undefined;
  isBigScreen: boolean = true;

  adsList: HomePageAd[] = [];
  displayedAds: HomePageAd[] = [];
  uniqueCitiesAndPostalCodes: string[] = [];

  // selected filters
  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];
  selectedGender: string[] = [];

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

  constructor(private adListService: AdListService) {}

  ngOnInit() {
    this.fetchAdsList(); // Calling the method when the component initializes
  }

  // fetching all the ads and populating template variables with the fetched data
  fetchAdsList() {
    this.adListService.fetchAdsList().subscribe((ads: HomePageAd[]) => {
      this.adsList = ads;
      this.displayedAds = ads;
      this.extractUniqueCitiesAndPostalCodes(ads);
    });
  }

  private extractUniqueCitiesAndPostalCodes(ads: HomePageAd[]) {
    // using a temporary set to remove any duplicate city+postalCode string values
    const tempUniqueCitiesAndPostalCodesSet: Set<string> = new Set();
    // populating the set with all the city+postalCode values found in our ads list
    ads.forEach((ad) =>
      tempUniqueCitiesAndPostalCodesSet.add(
        ad.publisherCity.concat(' (').concat(ad.publisherPostalCode).concat(')')
      )
    );
    // adding the unique values weeded out by the temporary set, into our array prop (to be used in the template)
    this.uniqueCitiesAndPostalCodes = [...tempUniqueCitiesAndPostalCodesSet];
  }

  // handling filter selection
  handleFilterSelection(filterType: string, value: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
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
      case 'category':
        this.updateSelectedArray(
          this.selectedCategories,
          value,
          checkbox.checked
        );
        break;
      case 'subcategory':
        this.updateSelectedArray(
          this.selectedSubcategories,
          value,
          checkbox.checked
        );
        break;
      case 'gender':
        this.updateSelectedArray(this.selectedGender, value, checkbox.checked);
        break;
    }
    this.adListService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategories,
        this.selectedSubcategories,
        this.selectedGender
      )
      .subscribe((filteredAds: HomePageAd[]) => {
        this.displayedAds = filteredAds;
      });
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = event.target.innerWidth > 1200;
  }

  //Méthod to select category filter
  //Mircea : to rename once you've finalised your method as this bit of code just gives you your search terms ;)
  methodToFilter(genderName: string | undefined, subCategoryName: string) {
    this.selectedCatFilter = genderName ?? subCategoryName;
    console.log(
      ' subCategoryName ',
      subCategoryName,
      'genderName ',
      genderName
    );
  }
}
