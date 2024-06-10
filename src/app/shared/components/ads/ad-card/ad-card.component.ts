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
    private router: Router) {
  }

  ngOnInit() {
    if (this.currentUserId) {
      this.ad.publisherId === this.currentUserId ? this.type = 'mine' : this.type = 'sellerAd';
    } else {
      this.type = 'unLogged';
    }
  }

  // TO DO :: checker pb de redirection et voir l'url est la bonne (si positionner sur sellerAd)
  goToAdPage(type: string) {
    type === 'mine' ? this.router.navigate(['compte/annonces/mon-annonce/', this.ad.id]) : this.router.navigate(['/annonce/', this.ad.publisherId, this.ad.id])
  }
}
