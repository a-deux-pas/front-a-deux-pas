import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tabs-account',
  templateUrl: './tabs-account.component.html',
  styleUrl: './tabs-account.component.scss',
})
export class TabsAccountComponent implements OnInit {
  active!: string | null;
  links = [
    { title: 'Mon profil', fragment: 'profil'},
    { title: 'Mes annonces', fragment: 'annonces' },
    { title: 'Mes RDV', fragment: 'rdv'},
    { title: 'Mes favoris', fragment: 'favoris' }
  ];

  constructor(public route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.split('/')[2]), // Extract the segment after '/compte/'
      distinctUntilChanged(), // Ensure that the active tab is only updated when the URL changes
      startWith(this.router.url.split('/')[2]) // Set initial value based on current URL
    ).subscribe(activeTab => {
      this.active = activeTab;
    });
  }
}
