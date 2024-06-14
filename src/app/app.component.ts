import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { DisplayManagementService } from './shared/services/display-management.service';
import { AdPageComponent } from './shared/components/ads/ad-page-content/ad-page-content.component';
import { AdFormComponent } from './shared/components/ads/ad-form/ad-form.component';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { AdService } from './routes/ad/ad.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'front';
  isAccountMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isBigScreen: boolean | undefined;
  windowSizeSubscription!: Subscription;
  onSellerAdPageUnlogged!: boolean

  constructor(
    private displayManagementService: DisplayManagementService,
    private authService: AuthService,
    private adService: AdService,
    private Location: Location
  ) { }

  accountNavbarMenuToggle() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  ngOnInit() {
    console.log('router:: ', this.Location.path())
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (status == false) {
        console.log('isLoggedInApp:: ', this.isLoggedIn)
        this.adService.sellerAdPageLoaded$.subscribe(hasAdAndSellerId => {
          this.onSellerAdPageUnlogged = hasAdAndSellerId;
        });
      }
    });
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }
}
