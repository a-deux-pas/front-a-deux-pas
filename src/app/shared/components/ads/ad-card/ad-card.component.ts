import { Component, Input, OnInit, ElementRef, Renderer2, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdCardService } from './ad-card.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './ad-card.component.scss',
  standalone: true,
})
export class AdCardComponent implements OnInit {
  @Input() ad!: AdCard;
  @Output() updateAdsFavoritesList: EventEmitter<AdCard> = new EventEmitter<AdCard>();
  type: 'loggedInUserAd' | 'sellerAd' | 'unLogged' = 'unLogged';
  currentUserId: number = parseInt(localStorage.getItem('userId')!);

  constructor(
    private router: Router, private location: Location, private adCardService: AdCardService, private renderer: Renderer2,  private el: ElementRef) {}

    
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

  goToAdPage(adId: number, adPublisherId: number) {
    const path = this.type === 'loggedInUserAd' ? ['/compte/annonces/mon-annonce', adId] : ['/annonce', adPublisherId, adId];
    this.router.navigate(path).then(() => {
      window.location.reload();
    });
  }

  addToFavorites(event: Event) {
    event.stopPropagation();
    this.ad.favorite = !this.ad.favorite;
    this.updateAdFavoriteStatus(this.ad.id, this.currentUserId, this.ad.favorite)
  }

  // TODO: ajouter alert Success et Error
  updateAdFavoriteStatus(adId: number, userId: number, isfavorite: boolean) {
    this.adCardService.updateAdFavoriteStatus(adId, userId, isfavorite).subscribe({
      next: (response) => {
          console.log(response);
          this.updateAdsFavoritesList.emit(this.ad)
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
