import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdHomeResponse } from '../../../../../shared/models/ad/ad-home-response.model';
import { AdCardComponent } from '../../../../../shared/components/ads/ad-card/ad-card.component';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  standalone: true,
  imports: [AdCardComponent],
})
export class AdListComponent {
  @Input() displayedAds: AdHomeResponse[] = [];
  @Input() noMoreAds: boolean = false;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

  loadMoreAds() {
    this.loadMore.emit();
  }
}
