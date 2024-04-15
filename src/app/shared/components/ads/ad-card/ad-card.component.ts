import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
})
export class AdCardComponent {
  @Input() ad: any;
}
