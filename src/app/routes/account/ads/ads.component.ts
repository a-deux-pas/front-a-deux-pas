import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DisplayManagementService } from '../../../shared/services/display-management.service';
import { Router } from '@angular/router';
import { AdCard } from '../../../shared/models/ad/ad-card.model';
import { AdListComponent } from '../../../shared/components/ads/ad-list/ad-list.component';
import { AdsService } from './ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
  standalone: true,
  imports: [TabsAccountComponent, CommonModule, AdListComponent]
})
export class AdsComponent implements OnInit {
  isBigScreen: boolean | undefined;
  windowSizeSubscription: Subscription;
  articlePictures: (string | undefined)[] = [];
  loggedInUserAds: AdCard[] = [];
  currentUserId = parseInt(localStorage.getItem('userId')!)
  userOtherAds: AdCard[] = [];
  noMoreAds: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 12;

  constructor(
    private adsService: AdsService,
    private displayManagementService: DisplayManagementService,
    private router: Router
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  ngOnInit(): void {
    this.fetchPaginatedAdsList();
  }

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  fetchPaginatedAdsList(): void {
    this.adsService.fetchUserAds(this.currentUserId, this.pageNumber, this.pageSize).subscribe({
      next: (ads: AdCard[]) => {
        this.loggedInUserAds = [...this.loggedInUserAds, ...ads];
        this.noMoreAds = ads.length <= 0;
      }
    });
  }

  createNewAd(): void {
    this.router.navigate(['annonce/creation']);
  }
}
