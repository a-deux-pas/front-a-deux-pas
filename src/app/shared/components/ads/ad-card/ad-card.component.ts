import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
      this.ad.publisherId === this.currentUserId ? this.type = 'mine' : this.type = 'sellerAd'
      console.log('this.ad.publisherId: ', this.ad.publisherId, 'this.currentUserId: ', this.currentUserId)
      console.log('type:: ', this.type)
    } else {
      this.type = 'unLogged';
      console.log('type:: ', this.type)
    }
    console.log(' this.ad.publisherId:: ', this.ad)
  }

  // TO DO :: checker pb de redirection et voir l'url est la bonne (si positionner sur sellerAd)
  goToAdPage() {
    if (this.type === 'mine') {
      this.router.navigate(['compte/annonces/mon-annonce/', this.ad.id]);
      //this.router.navigate([`/compte/annonces/mon-annonce/${this.ad.id}`]);
    } else {
      this.router.navigate([`/annonce/${this.ad.publisherId}/${this.ad.id}`]);
    }
  }
}
