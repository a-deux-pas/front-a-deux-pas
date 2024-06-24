import { Component } from '@angular/core';
import { AdPageComponent } from '../../../shared/components/ads/ad-page-content/ad-page-content.component';

@Component({
  selector: 'app-seller-ad',
  standalone: true,
  imports: [AdPageComponent],
  templateUrl: './seller-ad.component.html'
})
export class SellerAdComponent {
}
