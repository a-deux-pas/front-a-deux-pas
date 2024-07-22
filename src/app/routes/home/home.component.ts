import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdCardComponent } from '../../shared/components/ads/ad-card/ad-card.component';
import { AdFiltersComponent } from '../../shared/components/ads/ad-filters/ad-filters.component';
import { AdListComponent } from '../../shared/components/ads/ad-list/ad-list.component';
import { AdCard } from '../../shared/models/ad/ad-card.model';
import { AdService } from '../../shared/services/ad.service';
import { SellersComponent } from './components/sellers/sellers.component';
import { UserService } from '../../shared/services/user.service';
import { AdFavoriteService } from '../../shared/services/ad-favorite.service';
import { Subscription } from 'rxjs';
import { UserAliasAndLocation } from '../../shared/models/user/user-alias-and-location.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoriesComponent,
    AdCardComponent,
    AdFiltersComponent,
    AdListComponent,
    SellersComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  // local storage items
  userId: number = Number(localStorage.getItem('userId'));
  userAlias: string | null = localStorage.getItem('userAlias');
  loggedInUserCity: string | null = localStorage.getItem('userCity');
  isUserCityExistsWithAds: string | null = localStorage.getItem('isUserCityExistsWithAds');
  // ads
  pageNumber: number = 0;
  pageSize!: number;
  displayedAdsNumberUnlogged: number = 1;
  displayedAdsNumberLoggedIn: number = 4;
  filteredAds: AdCard[] = [];
  favoritesAds: AdCard[] = [];
  noMoreFilteredAds: boolean = false;
  noMorefavoriteAds: boolean = false;
  // filters
  selectedPriceRanges: string[] = [];
  selectedCities: string[] = [];
  selectedArticleStates: string[] = [];
  selectedCategory: string = 'Catégorie';
   // subscriptions
  favoritesSubscription!: Subscription;
  logginSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private adService: AdService,
    private adFavoriteService: AdFavoriteService,
  ) {}

  ngOnInit() {
    this.logginSubscription = this.logginSubscription = this.authService.isLoggedIn()
    .subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn
      this.initializePageSize();
      this.updateAdsFavoritesList();
      if (this.isUserLoggedIn) {
        this.fetchAdsByUserLocation();
        this.fetchUserFavoritesAds();
      } else {
        this.fetchPaginatedAdsList(true);
      }
    });
  }

  private initializePageSize() {
    this.pageSize = this.isUserLoggedIn ? 4 : 8;
  }

  private fetchAdsByUserLocation() {
    if (!this.userAlias || !this.loggedInUserCity || !this.isUserCityExistsWithAds) {
      this.getUserAliasAndLocation(this.userId);
    } else {
      this.adsDisplay(this.loggedInUserCity, this.isUserCityExistsWithAds);
      this.fetchPaginatedAdsList(true);
    }
  }

  private getUserAliasAndLocation(userId: number): void  {
    this.userService.getUserAliasAndLocation(userId).subscribe((data: UserAliasAndLocation) => {
      if (data?.alias) {
        this.userAlias = data.alias;
        localStorage.setItem('userAlias', this.userAlias);
      }

      if (data?.city && data?.postalCode) {
        this.loggedInUserCity = `${data.city} (${data.postalCode})`;
        localStorage.setItem('userCity', this.loggedInUserCity);
      } else {
        this.pageSize = 8;
      }

      this.isUserCityExistsWithAds = String(data?.isExistingLocationWithAds)
      localStorage.setItem('isUserCityExistsWithAds', this.isUserCityExistsWithAds);

      this.adsDisplay(this.loggedInUserCity, this.isUserCityExistsWithAds);
      this.fetchPaginatedAdsList(true);
    });
  }

  private adsDisplay(loggedInUserCity: string | null, isUserCityExistsWithAds: string | null) {
    if (loggedInUserCity && isUserCityExistsWithAds === 'true') {
      this.selectedCities.push(loggedInUserCity);
    } else {
      this.loggedInUserCity = null;
      this.pageSize = 8;
    }
  }

  loadMoreFilteredAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList(false);
  }

  private fetchPaginatedAdsList(reset: boolean = false) {
    this.adService
      .fetchFilteredAds(
        this.selectedPriceRanges,
        this.selectedCities,
        this.selectedArticleStates,
        this.selectedCategory,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe((ads: AdCard[]) => {
        this.filteredAds= reset ? ads : [...this.filteredAds, ...ads];
        this.noMoreFilteredAds = ads.length <= 0;
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
    this.fetchPaginatedAdsList(true);
    this.noMoreFilteredAds = false;
  }

  private fetchUserFavoritesAds(): void {
    this.adFavoriteService.getUserFavoritesAd(this.userId, this.pageNumber, this.pageSize).subscribe({
      next: (favoritesAds: AdCard[]) => {
        // Filter the new favorite ads to include only those that are not already in the existing favorites list
        const newFavoritesAds = favoritesAds.filter(newFavoriteAd =>
          !this.favoritesAds.some(favoriteAd => favoriteAd.id === newFavoriteAd.id));
        this.favoritesAds = [...this.favoritesAds, ...newFavoritesAds];
        this.noMorefavoriteAds = favoritesAds.length <= 0;
      }
    })
  }

  loadMoreFavoritesAds() {
    this.pageNumber++;
    this.fetchUserFavoritesAds();
  }

  updateAdsFavoritesList() {
    this.favoritesSubscription = this.adFavoriteService.updateAdsFavoritesList.subscribe(ad => {
      // Mettre à jour la liste des annonces favorites ici
      const favoriteAd = this.favoritesAds.find(favoriteAd => favoriteAd.id === ad.id);
      const filteredAd = this.filteredAds.find(favoriteAd => favoriteAd.id === ad.id);

      if (favoriteAd) {
        // Remove the ad from the favoritesAds list
        this.favoritesAds = this.favoritesAds.filter(favoriteAd => favoriteAd.id != ad.id);
        // Fetch the updated list of user's favorite ads
        this.fetchUserFavoritesAds();
      }

      if(filteredAd) {
        if (ad.favorite) {
          // If the ad is marked as favorite, add it to the beginning of the favoritesAds list
          this.favoritesAds.unshift(ad);
          this.noMorefavoriteAds = this.favoritesAds.length <= 0;
        }
        filteredAd.favorite = ad.favorite;
      }
    });
  }

  ngOnDestroy(): void {
    // Clean subscription to prevent memory leaks
    this.favoritesSubscription.unsubscribe();
    this.logginSubscription.unsubscribe();
  }
}
