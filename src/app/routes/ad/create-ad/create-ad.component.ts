import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent {
  formTitle: string = 'Créer une annonce';
  isCreateAdForm: boolean = true;
}
