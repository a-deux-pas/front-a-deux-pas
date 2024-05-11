import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AdCardComponent {
  @Input() ad: any;
  // TO DO : logique à changer une fois le processus de connexion implémenté
  @Input() mine: boolean = false;
  @Input() sellerAd: boolean = false;
  @Input() unLogged: boolean = false;
}
