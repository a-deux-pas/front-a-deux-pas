import { Component } from '@angular/core';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrl: './ad-form.component.scss'
})
export class AdFormComponent {
  selectedPicNumber: number = 0;
  state: string="";
  states = [
    { id: 1, name: 'Neuf avec étiquette' },
    { id: 2, name: 'Neuf sans étiquette' },
    { id: 3, name: 'Très bon état' },
    { id: 4, name: 'Bon état' },
    { id: 5, name: 'Satisfaisant' },
  ];
}
