import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { DisplayManagementService } from './shared/services/display-management.service';
import { CtaMyAdComponent } from './shared/components/ads/cta-my-ad/cta-my-ad.component';
import { UserOtherAdComponent } from './shared/components/ads/user-other-ad/user-other-ad.component';
import { AdPageComponent } from './shared/components/ads/ad-page/ad-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CtaMyAdComponent, UserOtherAdComponent, AdPageComponent]
})
export class AppComponent {
  title = 'front';
  isAccountMenuOpen: boolean = false;

  isBigScreen: boolean | undefined;
  windowSizeSubscription: Subscription;

  constructor(
    private displayManagementService: DisplayManagementService
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  accountNavbarMenuToggle() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
