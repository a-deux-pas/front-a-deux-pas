import { Component, Input, OnInit } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { Router } from '@angular/router';

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
    private router: Router) { }

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

  // TO DO :: checker pb de redirection et voir si l'url est la bonne 
  goToAdPage() {
    this.type === 'mine' ? this.router.navigate(['/compte/annonces/mon-annonce', this.ad.id]) : this.router.navigate(['/annonce', this.ad.publisherId, this.ad.id]);
  }
}
