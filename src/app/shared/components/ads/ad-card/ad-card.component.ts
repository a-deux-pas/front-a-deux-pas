import { Component, Input, OnInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdPostResponse;
  type: 'loggedInUserAd' | 'sellerAd' | 'unLogged' = 'unLogged';
  currentUserId: number = parseInt(localStorage.getItem('userId')!);
// Possible de faire avec viewChild ?
  constructor(
    private router: Router, private location: Location, private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit() {
    if (this.ad.title!.length > 23) {
      this.ad.title = `${this.ad.title?.substring(0, 23)}.. `
    }
    if (this.currentUserId) {
      this.type = this.ad.publisherId === this.currentUserId ? 'loggedInUserAd' : 'sellerAd';
    } else {
      this.type = 'unLogged';
    }
    if(this.ad.status === 'SOLD') {
      this.addStatusClass('sold')
    }
    if(this.ad.status === 'RESERVED') {
      this.addStatusClass('reserved')
    }
  }

   addStatusClass(newStatus: string) {
    const imgElement = this.el.nativeElement.querySelector('.card-img-top');
    if (imgElement) {
      this.renderer.addClass(imgElement, newStatus);
    }
  }

  goToAdPage(adId: number, adPublisherId: number) {
    const path = this.type === 'loggedInUserAd' ? ['/compte/annonces/mon-annonce', adId] : ['/annonce', adPublisherId, adId];
    this.router.navigate(path).then(() => {
      window.location.reload();
    });
  }
}
