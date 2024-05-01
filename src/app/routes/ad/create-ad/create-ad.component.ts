import { Component } from '@angular/core';
import { AdFormComponent } from '../../../shared/components/ads/ad-form/ad-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  standalone: true,
  imports: [AdFormComponent, CommonModule, FormsModule]
})
export class CreateAdComponent {
  formTitle: string = 'Créer une annonce';
  isCreateAdForm: boolean = true;
}
