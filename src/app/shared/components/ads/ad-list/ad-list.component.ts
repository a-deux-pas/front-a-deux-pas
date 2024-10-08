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
  adsListLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.adsListLoading = false;
    }, 500);
  }

  loadMoreAds() {
    this.loadMore.emit();
  }
}
