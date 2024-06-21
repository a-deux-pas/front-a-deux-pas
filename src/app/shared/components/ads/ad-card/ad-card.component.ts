import { Component, Input, OnInit } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdPostResponse;
  type: 'mine' | 'sellerAd' | 'unLogged' = 'unLogged';
  currentUserId: number = parseInt(localStorage.getItem('userId')!);

  constructor(
    private router: Router, private location: Location) { }

  ngOnInit() {
    if (this.ad.title!.length > 23) {
      this.ad.title = `${this.ad.title?.substring(0, 23)}.. `
    }
    if (this.currentUserId) {
      this.type = this.ad.publisherId === this.currentUserId ? 'mine' : 'sellerAd';
    } else {
      this.type = 'unLogged';
    }
  }

  goToAdPage(adId: number, adPublisherId: number) {
    const path = this.type === 'mine' ? ['/compte/annonces/mon-annonce', adId] : ['/annonce', adPublisherId, adId];
    this.router.navigate(path).then(() => {
      window.location.reload();
    });
  }
}
