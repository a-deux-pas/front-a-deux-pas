import { Component, Input } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';

@Component({
  selector: 'app-ad-general-info',
  standalone: true,
  imports: [],
  template: `
    <section class="general-info mt-3">
            <div class="title-and-price">
                <p id="ad-title"><b>{{ myAd.title }}</b></p>
                <p id="ad-price">{{ myAd.price }} €</p>
            </div>
            <div class="other-info flex-column">
                <p id="ad-creation-date" class="mt-2">Créée le {{ myAd.creationDate }}</p>
                <p id="ad-state" class="mt-2"><b>État {{ myAd.articleState }}</b></p>
                <p id="ad-description" class="mt-2">{{ myAd.articleDescription }}</p><br>
            </div>
        </section>
  `,
  styleUrl: './ad-general-info.component.scss'
})
export class AdGeneralInfoComponent {
  @Input() myAd!: AdPostResponse
}
