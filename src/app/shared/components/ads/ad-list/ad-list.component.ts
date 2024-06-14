import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';
import { AdCardComponent } from '../ad-card/ad-card.component';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
