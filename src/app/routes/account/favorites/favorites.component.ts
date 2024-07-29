import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { AdListComponent } from '../../../shared/components/ads/ad-list/ad-list.component';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { AdFavoriteService } from '../../../shared/services/ad-favorite.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
    standalone: true,
    imports: [TabsAccountComponent, AdListComponent]
})
export class FavoritesComponent implements OnInit {
  userId: number = Number(localStorage.getItem('userId'));
  pageNumber: number = 0;
  pageSize: number = 12;
  displayedAdsNumber: number = 12;
  favoritesAds: AdCard[] = [];
  noMorefavoriteAds: boolean = false;
  favoritesSubscription!: Subscription;
  favoritesLoading: boolean = true;

  constructor(
    private adFavoriteService: AdFavoriteService
  ) {}

  ngOnInit(): void {
    this.fetchUserFavoritesAds();
    this.updateAdsFavoritesList();
    setTimeout(() => {
      this.favoritesLoading = false;
    }, 300);
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
    });
  }

  loadMoreFavoritesAds() {
    this.pageNumber++;
    this.fetchUserFavoritesAds();
  }

  updateAdsFavoritesList() {
    this.favoritesSubscription = this.adFavoriteService.updateAdsFavoritesList.subscribe(ad => {
      const favoriteAd = this.favoritesAds.find(favoriteAd => favoriteAd.id === ad.id);
      if (favoriteAd) {
        // Remove the ad from the favoritesAds list
        this.favoritesAds = this.favoritesAds.filter(favoriteAd => favoriteAd.id != ad.id);
      }
      // Fetch the updated list of user's favorite ads
      this.fetchUserFavoritesAds();
      }
  )};

  ngOnDestroy(): void {
    // Clean subscription to prevent memory leaks
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
