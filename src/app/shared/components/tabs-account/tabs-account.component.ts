import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-account',
  templateUrl: './tabs-account.component.html',
  styleUrl: './tabs-account.component.scss'
})
export class TabsAccountComponent {
  links = [
    { title: 'Mon profil', fragment: '/compte/profil'},
    { title: 'Mes annonces', fragment: '/compte/annonces' },
    { title: 'Mon RDV', fragment: '/compte/rdv'},
    { title: 'Mes favoris', fragment: '' }
  ];

  constructor(public route: ActivatedRoute) {}

}
