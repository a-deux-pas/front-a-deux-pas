import { Component } from '@angular/core';
import { AdFormComponent } from '../../../../../shared/components/ads/ad-form/ad-form.component';

@Component({
  selector: 'app-update-my-ad',
  standalone: true,
  imports: [AdFormComponent],
  templateUrl: './update-my-ad.component.html',
})
export class UpdateMyAdComponent {
  formTitle: string = 'Modifier mon annonce';
  isCreateAdForm: boolean = false;
}
