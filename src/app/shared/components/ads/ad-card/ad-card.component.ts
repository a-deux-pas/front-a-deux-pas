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

  goToAdPage() {
    if (this.ad.id && this.ad.publisherId) {
      if (this.type === 'mine') {
        this.router.navigate(['/compte/annonces/mon-annonce', this.ad.id])
          .then(() => {
            window.location.reload();
          });
      } else {
        this.router.navigate(['/annonce', this.ad.publisherId, this.ad.id])
          .then(() => {
            window.location.reload();
          });
      }
    } else {
      console.error('Invalid ad data for navigation:', this.ad);
    }
  }
}
