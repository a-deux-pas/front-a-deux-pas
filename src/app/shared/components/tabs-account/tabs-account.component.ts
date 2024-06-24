import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { accountRoutes } from '../../../routes/account/account-routing.module';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tabs-account',
    templateUrl: './tabs-account.component.html',
    styleUrl: './tabs-account.component.scss',
    standalone: true,
    imports: [ NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, RouterLink],
})
export class TabsAccountComponent implements OnInit {
  active!: string | null;
  accountRoutes = accountRoutes;

  constructor(public route: ActivatedRoute, private router: Router) {}

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
