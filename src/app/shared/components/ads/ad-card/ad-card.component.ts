import { Component, Input, OnInit, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdFavoriteService } from '../../../services/ad-favorite.service';
import { AdStatus } from '../../../models/enum/ad-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdCard;
  @Output() updateAdsFavoritesList: EventEmitter<AdCard> = new EventEmitter<AdCard>();
  adStatus = AdStatus;
  type: 'loggedInUserAd' | 'sellerAd' | 'unLogged' = 'unLogged';
  currentUserId: number = Number(localStorage.getItem('userId')!);

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private adFavoriteService: AdFavoriteService,
    private router : Router
  ) { }

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

  goToAdPage(adId: number, adPublisherAlias: string, adPublisherId: number) {
    if (this.type === 'loggedInUserAd') {
      window.location.href = `/compte/annonces/mon-annonce/${adId}`;
    } else {
      if (!this.currentUserId) {
        // If no user is logged in and visits a seller's ad page
        // Store adPublisherId in sessionStorage
        sessionStorage.setItem('adPublisherId', adPublisherId.toString());
      }
      window.location.href = `/annonce/${adPublisherAlias}/${adId}`;
    }
  }

  goToAdUpdateForm(event: Event, adId: number) {
    event.stopPropagation();
    this.router.navigate(['/compte/annonces/mon-annonce', adId, 'modification']);
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
