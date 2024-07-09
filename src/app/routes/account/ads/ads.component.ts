import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AdService } from '../../../shared/services/ad.service';
import { DisplayManagementService } from '../../../shared/services/display-management.service';
import { AdCardComponent } from '../../../shared/components/ads/ad-card/ad-card.component';
import { Router } from '@angular/router';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { AdPageContentService } from '../../../shared/components/ads/ad-page-content/ad-page-content.service';
import { AdListComponent } from '../../../shared/components/ads/ad-list/ad-list.component';



@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrl: './ads.component.scss',
    standalone: true,
    imports: [TabsAccountComponent, CommonModule, AdCardComponent, AdListComponent]
})
export class AdsComponent implements OnInit, AfterViewInit {
    isBigScreen: boolean | undefined;
    windowSizeSubscription: Subscription;
    loggedInUserAd: AdCard[] = [];
    articlePictures: (string | undefined)[] = [];
    loggedInUserAds: AdCard[] = [];
    currentUserId = parseInt(localStorage.getItem('userId')!)
    userOtherAds: AdCard[] = [];
    noMoreAds: boolean = false;
    adCount!: number;
    pageNumber: number = 0;
    pageSize: number = 12;
// CHEcKE asynchronicité de l'affichage des ads , interet de nomeoreAd et adCount
    constructor(
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

    ngAfterViewInit(): void {
      this.fetchPaginatedAdsList('adTab', this.currentUserId, this.pageNumber, this.pageSize, true);
    }

    loadMoreAds() {
        this.pageNumber++;
        this.fetchPaginatedAdsList('adTab', this.currentUserId, this.pageNumber, this.pageSize, false);
    }

    fetchPaginatedAdsList(location: string, userId: number, pageNumber: number, pageSize: number, initialLoad: boolean): void {
        this.adPageContentService.fetchUserAds(location, userId, pageNumber, pageSize).subscribe({
          next: (ads: AdCard[]) => {
            if (initialLoad) {
              this.loggedInUserAds = ads;
               console.table(this.loggedInUserAds)
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
