import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdCardComponent } from '../ad-card/ad-card.component';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  standalone: true,
  imports: [AdCardComponent],
})
export class AdListComponent implements OnInit {
  @Input() displayedAds: AdCard[] = [];
  @Input() displayedAdsNumber!: number;
  @Input() noMoreAds: boolean = false;
  @Input() showingSimilarAds: boolean = false;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateAdsFavoritesList: EventEmitter<AdCard> = new EventEmitter<AdCard>();
  
  ngOnInit() {
    console.error('ici')
    console.table(this.displayedAds)
    console.log('displayedAdsNumber:: ', this.displayedAdsNumber)
    console.log('this.displayedAds.length:: ', this.displayedAds.length)
    console.log('this.displayedAdsNumber:: ', this.displayedAdsNumber)
    console.log('noMoreAds:: ', this.noMoreAds)
    console.log('showingSimilarAds:: ', this.showingSimilarAds)
 
  }

  loadMoreAds() {
    this.loadMore.emit();

  }

  UpdateAdsFavoritesList(ad: AdCard) {
    this.updateAdsFavoritesList.emit(ad);
  }
}
