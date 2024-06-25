import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { AdPostResponse } from '../../../shared/models/ad/ad-post-response.model';
import { Subscription } from 'rxjs';
import { AdService } from '../../ad/ad.service';
import { DisplayManagementService } from '../../../shared/services/display-management.service';
import { AdCardComponent } from '../../../shared/components/ads/ad-card/ad-card.component';
import { Router } from '@angular/router';


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
    loggedInUserAd: AdPostResponse | undefined;
    articlePictures: (string | undefined)[] = [];
    loggedInUserAds: AdPostResponse[] = [];
    currentUserId = parseInt(localStorage.getItem('userId')!)
    userOtherAds: AdPostResponse[] = [];
    noMoreAds: boolean = false;
    showSeeMorBtn!: boolean;
    adCount!: number;
    pageNumber: number = 0;
    pageSize: number = 12;

    constructor(
        private adService: AdService,
        private displayManagementService: DisplayManagementService,
        private router: Router
    ) {
        this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
            this.isBigScreen = isBigScreen;
        });
    }

    ngOnInit(): void {
        this.adService.fetchMoreAdsInAdTab(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
            next: (sortedAds: AdPostResponse[]) => {
                this.loggedInUserAds = sortedAds;
                this.adService.getMyAdsCount(this.currentUserId).subscribe({
                    next: (adCount: number) => {
                        this.adCount = adCount;
                        this.showSeeMorBtn = this.adCount > 12;
                    }
                });
            }
        });
    }

    loadMoreAds() {
        this.pageNumber++;
        this.fetchPaginatedAdsList();
    }

    fetchPaginatedAdsList() {
        this.adService.fetchMoreAdsInAdTab(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
            next: (moreAds: AdPostResponse[]) => {
                this.loggedInUserAds = [...this.loggedInUserAds, ...moreAds];
                this.noMoreAds = this.loggedInUserAds.length >= (this.adCount - 1) && this.adCount > 12
            }
        });
    }

    createNewAd(): void {
        this.router.navigate(['annonce/creation']);
    }
}
