import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
  standalone: true,
})
export class AdCardComponent {
  @Input() ad: any;
  @Input() mine: boolean = false;
  @Input() sellerAd: boolean = false;
  @Input() unLogged: boolean = false;
}
