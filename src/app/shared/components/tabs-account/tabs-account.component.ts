import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { accountRoutes } from '../../../routes/account/account-routing.module';

@Component({
  selector: 'app-tabs-account',
  templateUrl: './tabs-account.component.html',
  styleUrl: './tabs-account.component.scss',
})
export class TabsAccountComponent implements OnInit {
  active!: string | null;
  accountRoutes = accountRoutes;

  constructor(public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.events);
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
