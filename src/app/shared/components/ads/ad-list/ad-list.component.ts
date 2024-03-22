import { Component, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { HomePageAd } from '../../../models/HomePageAd.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  // styleUrl: './ad-list.component.scss',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  // holds all the ads fetched from the DB, at page load
  adsList: HomePageAd[] = [];

  // variables fed by 'adsList' :
  displayedAds: HomePageAd[] = [];
  uniqueCitiesAndPostalCodes: string[] = [];

  constructor(private adListService: AdListService) {}

  ngOnInit() {
    // calling the method when the component initializes
    this.fetchAdsList();
  }

  // fetching all the ads and populating template variables with the fetched data
  fetchAdsList() {
    this.adListService.fetchAdList().subscribe((ads: HomePageAd[]) => {
      this.adsList = ads;
      this.displayedAds = ads;
      this.extractUniqueCitiesAndPostalCodes(ads);
    });
  }

  private extractUniqueCitiesAndPostalCodes(ads: HomePageAd[]) {
    // using a temporary set to remove any duplicate city+postalCode string values
    const tempUniqueCitiesAndPostalCodesSet: Set<string> = new Set();
    // weeding out the duplicate city+postalCode values, by using a set, initialized with all the values found in our ads list
    ads.forEach((ad) =>
      tempUniqueCitiesAndPostalCodesSet.add(
        // formatting the string used in the 'City' filter template to display : 'City (postal code)'
        ad.publisherCity.concat(' (').concat(ad.publisherPostalCode).concat(')')
      )
    );
    // adding the unique values from the temporary set into our array prop (to be used in the filter template)
    this.uniqueCitiesAndPostalCodes = [...tempUniqueCitiesAndPostalCodesSet];
  }
}
