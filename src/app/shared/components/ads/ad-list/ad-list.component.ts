import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdCardComponent } from '../ad-card/ad-card.component';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  standalone: true,
  imports: [AdCardComponent],
})
export class AdListComponent {
  @Input() displayedAds: AdCard[] = [];
  @Input() displayedAdsNumber!: number;
  @Input() noMoreAds: boolean = false;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateAdsFavoritesList: EventEmitter<AdCard> = new EventEmitter<AdCard>();

  loadMoreAds() {
    this.loadMore.emit();
  }

  UpdateAdsFavoritesList(ad: AdCard) {
    this.updateAdsFavoritesList.emit(ad);
  }
}

// TODO : apres merge de l'US de Lea, utiliser adList et virer adCOunt method - utiliser lenght des otherAds