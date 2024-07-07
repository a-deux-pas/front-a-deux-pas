import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { AdListComponent } from '../../../shared/components/ads/ad-list/ad-list.component';
import { AdService } from '../../../shared/services/ad.service';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { AlertType } from '../../../shared/models/alert.model';
import { AlertMessage } from '../../../shared/models/enum/alert-message.enum';
import { DisplayManagementService } from '../../../shared/services/display-management.service';

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

  constructor(
    private adService: AdService, private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit(): void {
    this.fetchUserFavoritesAds();
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
    });
  }

  loadMoreFavoritesAds() {
    this.pageNumber++;
    this.fetchUserFavoritesAds();
  }

  updateAdsFavoritesList(ad: AdCard) {
    const favoriteAd = this.favoritesAds.find(favoriteAd => favoriteAd.id === ad.id);
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
  }
}
