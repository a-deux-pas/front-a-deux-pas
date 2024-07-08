import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdCardComponent } from '../../shared/components/ads/ad-card/ad-card.component';
import { AdFiltersComponent } from '../../shared/components/ads/ad-filters/ad-filters.component';
import { AdListComponent } from '../../shared/components/ads/ad-list/ad-list.component';
import { AdCard } from '../../shared/models/ad/ad-card.model';
import { AdService } from '../../shared/services/ad.service';
import { UserPresentation } from '../../shared/models/user/user-presentation.model';
import { SellersComponent } from './components/sellers/sellers.component';
import { HomeService } from './home.service';
import { AlertMessage } from '../../shared/models/enum/alert-message.enum';
import { AlertType } from '../../shared/models/alert.model';
import { DisplayManagementService } from '../../shared/services/display-management.service';

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
  isLoggedIn: boolean = false;
  // local storage items
  userId: number = Number(localStorage.getItem('userId'));
  userAlias: string | null = localStorage.getItem('userAlias');
  loggedInUserCity: string | null = localStorage.getItem('userCity');
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

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private adService: AdService,
    private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit() {
    this.subscribeToLoginStatus();
    this.initializePageSize();
    if (this.isLoggedIn) {
      this.fetchAdsByUserLocation();
      this.fetchUserFavoritesAds();
    } else {
      this.fetchPaginatedAdsList(true);
    }
  }

  private subscribeToLoginStatus() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  private initializePageSize() {
    this.pageSize = this.isLoggedIn ? 4 : 8;
  }

  private fetchAdsByUserLocation() {
    if (!this.userAlias && !this.loggedInUserCity) {
      this.getUserAliasAndLocation(this.userId);
    } else {
      this.selectedCities.push(this.loggedInUserCity!);
      this.fetchPaginatedAdsList(true);
    }
  }

  private getUserAliasAndLocation(userId: number): void  {
    this.homeService.getUserAliasAndLocation(userId).subscribe((data: UserPresentation) => {
      this.userAlias = data.alias;
      this.loggedInUserCity = `${data.city} (${data.postalCode})`;
      this.selectedCities.push(this.loggedInUserCity);
      this.fetchPaginatedAdsList(true);
    })
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
    this.adService.getUserFavoritesAd(this.userId, this.pageNumber, this.pageSize).subscribe({
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

  updateAdsFavoritesList(ad: AdCard) {
    const favoriteAd = this.favoritesAds.find(favoriteAd => favoriteAd.id === ad.id);
    const filteredAd = this.filteredAds.find(favoriteAd => favoriteAd.id === ad.id);

    if (favoriteAd) {
      // Remove the ad from the favoritesAds list
      this.favoritesAds = this.favoritesAds.filter(favoriteAd => favoriteAd.id != ad.id);
      // Fetch the updated list of user's favorite ads
      this.fetchUserFavoritesAds();
      this.displayManagementService.displayAlert({
        message: AlertMessage.FAVORITES_REMOVED_SUCCESS,
        type: AlertType.SUCCESS,
      });
    }

    if(filteredAd) {
      if (ad.favorite) {
        // If the ad is marked as favorite, add it to the beginning of the favoritesAds list
        this.favoritesAds.unshift(ad);
        this.displayManagementService.displayAlert({
          message: AlertMessage.FAVORITES_ADDED_SUCCESS,
          type: AlertType.SUCCESS,
        });
        this.noMorefavoriteAds = this.favoritesAds.length <= 0;
      }
      filteredAd.favorite = ad.favorite;
    }
  }
}
