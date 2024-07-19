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
  articlePictures: (string | undefined)[] = [];
  loggedInUserAds: AdCard[] = [];
  currentUserId = Number(localStorage.getItem('userId')!)
  userOtherAds: AdCard[] = [];
  noMoreAds: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 12;
  adsLoading: boolean = true;

  constructor(
    private adsService: AdsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPaginatedAdsList();
    setTimeout(() => {
      this.adsLoading = false;
    });
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
