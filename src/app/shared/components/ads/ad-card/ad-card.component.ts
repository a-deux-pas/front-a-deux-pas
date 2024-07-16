import { Component, Input, OnInit, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdFavoriteService } from '../../../services/ad-favorite.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdCard;
  @Output() updateAdsFavoritesList: EventEmitter<AdCard> = new EventEmitter<AdCard>();
  type: 'loggedInUserAd' | 'sellerAd' | 'unLogged' = 'unLogged';
  currentUserId: number = Number(localStorage.getItem('userId')!);

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private adFavoriteService: AdFavoriteService
  ) {}

  ngOnInit() {
    if (this.ad.title.length > 23) {
      this.ad.title = `${this.ad.title?.substring(0, 23)}.. `
    }
    if (this.currentUserId) {
      this.type = this.ad.publisherId === this.currentUserId ? 'loggedInUserAd' : 'sellerAd';
    } else {
      this.type = 'unLogged';
    }
    if (this.ad.status) {
      this.addStatusClass(this.ad.status);
    }
  }

  addStatusClass(newStatus: string) {
    const imgElement = this.el.nativeElement.querySelector('.card-img-top');
    if (imgElement) {
      this.renderer.addClass(imgElement, newStatus);
    }
  }

  goToAdPage(adId: number, adPublisherAlias: string) {
    const path = this.type === 'loggedInUserAd' ? ['/compte/annonces/mon-annonce', adId] : ['/annonce', adPublisherAlias, adId];
    this.router.navigate(path).then(() => {
      window.location.reload();
    });
  }

  addToFavorites(event: Event) {
    event.stopPropagation();
    this.ad.favorite = !this.ad.favorite;
    this.adFavoriteService.updateAdFavoriteStatus(
      this.ad.id,
      this.currentUserId,
      this.ad.favorite,
      this.ad
    );
  }
}
