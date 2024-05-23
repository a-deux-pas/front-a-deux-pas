import { Component, Input, OnInit } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdPostResponse;
  // TO DO : logique à changer une fois le processus de connexion implémenté
  @Input() currentUserId: number = 1;
  @Input() type: 'mine' | 'sellerAd' | 'unLogged' = 'unLogged';
  constructor(
  ) { }

  ngOnInit() {
    if (this.ad.publisherId === this.currentUserId) {
      this.type = 'mine';
    } else if (this.ad.publisherId !== this.currentUserId) {
      this.type = 'sellerAd';
    } else {
      this.type = 'unLogged';
    }
    console.log(this.ad.title, ' - ', this.ad.publisherId, ' - ', this.currentUserId)
  }

  // TO DO :: essayer de comprendre pourquoi this.router.navigate ne fonctionne pas
  // goToAdPage() {
  //   if (this.type === 'mine') {
  //     console.log('ici')
  //     this.router.navigate([`compte/annonces/mon-annonce/${this.ad.id}`]);
  //   } else {
  //     this.router.navigate([`/annonce/${this.ad.publisherId}/${this.ad.id}`]);
  //   }
  // }
}
