import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { adServiceToMaybeRemove } from '../../ad/ad.service';
import { AdService } from '../../../shared/services/ad.service';
import { DisplayManagementService } from '../../../shared/services/display-management.service';
import { AdCardComponent } from '../../../shared/components/ads/ad-card/ad-card.component';
import { Router } from '@angular/router';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { AdPageContentService } from '../../../shared/components/ads/ad-page-content/ad-page-content.service';


@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrl: './ads.component.scss',
    standalone: true,
    imports: [TabsAccountComponent, CommonModule, AdCardComponent]
})
export class AdsComponent implements OnInit {
    isBigScreen: boolean | undefined;
    windowSizeSubscription: Subscription;
    loggedInUserAd: AdCard | undefined;
    articlePictures: (string | undefined)[] = [];
    loggedInUserAds: AdCard[] = [];
    currentUserId = parseInt(localStorage.getItem('userId')!)
    userOtherAds: AdCard[] = [];
    noMoreAds: boolean = false;
    showSeeMorBtn!: boolean;
    adCount!: number;
    pageNumber: number = 0;
    pageSize: number = 12;

    constructor(
        private adService: adServiceToMaybeRemove,
        private mainAdService: AdService,
        private adPageContentService: AdPageContentService,
        private displayManagementService: DisplayManagementService,
        private router: Router
    ) {
        this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
            this.isBigScreen = isBigScreen;
        });
    }
    
    ngOnInit(): void {
        this.fetchPaginatedAdsList('adTab', this.currentUserId, this.pageNumber, this.pageSize, true);
    }

    loadMoreAds() {
        this.pageNumber++;
        this.fetchPaginatedAdsList('adTab', this.currentUserId, this.pageNumber, this.pageSize, false);
    }

    // fetchPaginatedAdsList() {
    //     this.adService.fetchMoreAds('adTab', this.currentUserId, this.pageNumber, this.pageSize).subscribe({
    //         next: (moreAds: AdCard[]) => {
    //             this.loggedInUserAds = [...this.loggedInUserAds, ...moreAds];
    //             this.noMoreAds = this.loggedInUserAds.length >= (this.adCount - 1) && this.adCount > 12
    //         }
    //     });
    // }

    fetchPaginatedAdsList(location: string, userId: number, pageNumber: number, pageSize: number, initialLoad: boolean): void {
        this.adPageContentService.fetchUserAds(location, userId, pageNumber, pageSize).subscribe({
          next: (ads: AdCard[]) => {
            if (initialLoad) {
              this.loggedInUserAds = ads;
              this.adService.getMyAdsCount(userId).subscribe({
                next: (adCount: number) => {
                  this.adCount = adCount;
                  this.showSeeMorBtn = this.adCount > 12;
                }
              });
            } else {
              this.loggedInUserAds = [...this.loggedInUserAds, ...ads];
              this.noMoreAds = this.loggedInUserAds.length >= (this.adCount - 1) && this.adCount > 12;
            }
          }
        });
      }

    createNewAd(): void {
        this.router.navigate(['annonce/creation']);
    }
}
