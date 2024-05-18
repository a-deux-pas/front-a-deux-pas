import { Component } from '@angular/core'
import { AdPageComponent } from '../../../../shared/components/ads/ad-page/ad-page.component';



@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  standalone: true,
  imports: [
    AdPageComponent,
  ]
})
export class MyAdComponent {
}
