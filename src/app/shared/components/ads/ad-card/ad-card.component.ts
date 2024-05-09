import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
  standalone: true,
})
export class AdCardComponent {
  @Input() ad: any;
  // TO DO : logique à changer une fois le processus de connexion implémenté
  @Input() mine: boolean = false;
  @Input() sellerAd: boolean = false;
  @Input() unLogged: boolean = false;
}
