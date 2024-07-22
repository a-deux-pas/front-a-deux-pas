import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { RouterModule,Router, NavigationEnd, } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-meetings',
    templateUrl: './meetings.component.html',
    styleUrl: './meetings.component.scss',
    standalone: true,
    imports: [TabsAccountComponent, RouterModule, CommonModule]
})
export class MeetingsComponent implements OnInit {
  activeTab: string = 'proposes';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const urlParts = event.url.split('/');
      this.activeTab = urlParts[urlParts.length - 1];
    });
  }

  ngOnInit() {
    if (this.router.url === '/compte/rdv') {
      this.router.navigate(['/compte/rdv/proposes']);
    } else {
      const urlParts = this.router.url.split('/');
      this.activeTab = urlParts[urlParts.length - 1];
    }
  }

  navigateTo(tab: string) {
    this.router.navigate(['/compte/rdv', tab]);
  }
}
