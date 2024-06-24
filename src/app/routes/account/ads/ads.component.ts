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

    // TO DO:: creer une 10aine d'ads pour voir si le btn see more apparait bien, parmis celle-ci en mettre en status RESERVED ou SOLD
    ngOnInit(): void {
        this.adService.findMyAds(this.currentUserId, this.pageSize).subscribe({
            next: (myAds: AdPostResponse[]) => {
                const sortedAds = myAds.slice().sort((ad1, ad2) => {
                    if ((ad1.status === 'RESERVED' || ad1.status === 'SOLD') && !(ad2.status === 'RESERVED' || ad2.status === 'SOLD')) {
                        return 1;
                    }
                    if (!(ad1.status === 'RESERVED' || ad1.status === 'SOLD') && (ad2.status === 'RESERVED' || ad2.status === 'SOLD')) {
                        return -1;
                    }
                    return 0;
                });
                this.loggedInUserAds = sortedAds;
                console.log('this.myAds:: ', this.loggedInUserAds)
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
        console.log('this.pageNumber:: ', this.pageNumber , ' this.pageSize:: ', this.pageSize)
        this.adService.fetchMoreAds(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
            next: (ads: AdPostResponse[]) => {
                this.loggedInUserAds = [...this.loggedInUserAds, ...ads];
                console.table( this.loggedInUserAds)
                this.noMoreAds = this.loggedInUserAds.length >= (this.adCount - 1) && this.adCount > 12
            }
        });
    }

    createNewAd(): void {
        this.router.navigate(['annonce/creation']);
    }
}
