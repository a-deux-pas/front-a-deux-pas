import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  LOCALE_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { DisplayManagementService } from './shared/services/display-management.service';
import { AuthService } from './shared/services/auth.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AdService } from './shared/services/ad.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import localeFr from '@angular/common/locales/fr'; // Import localeFr

registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
  ],
  template: '<app-date-picker></app-date-picker>',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front';
  isAccountMenuOpen: boolean = false;
  isUserLoggedIn: boolean = false;
  onSellerAdPageUnloggedSubscription!: Subscription;
  logginSubscription!: Subscription;
  windowSizeSubscription!: Subscription;
  onSellerAdPageUnlogged!: boolean;
  isBigScreen: boolean = false;

  constructor(
    private authService: AuthService,
    private adService: AdService,
    private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.logginSubscription = this.authService
      .isLoggedIn()
      .subscribe((status: boolean) => {
        this.isUserLoggedIn = status;
        console.log('is user logged in?', this.isUserLoggedIn);
      });

    this.windowSizeSubscription =
      this.displayManagementService.isBigScreen$.subscribe((isBigScreen) => {
        this.isBigScreen = isBigScreen;
      });
  }

  ngAfterViewInit(): void {
    if (!this.isUserLoggedIn) {
      this.onSellerAdPageUnloggedSubscription =
        this.adService.sellerAdPageLoaded$.subscribe((hasAdAndSellerId) => {
          this.onSellerAdPageUnlogged = hasAdAndSellerId;
        });
    }
  }

  accountNavbarMenuToggle(isOpen: boolean) {
    this.isAccountMenuOpen = isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isBigScreen) {
      const targetElement = event.target as HTMLElement;
      const clickedInsideMenu = targetElement.closest('#account-menu');
      const clickedDesktopIcon = targetElement.closest('#desktop-account-icon');
      // Only close the menu if clicked outside the menu and not on the desktop account icon
      if (
        this.isAccountMenuOpen &&
        clickedInsideMenu === null &&
        clickedDesktopIcon === null
      ) {
        this.isAccountMenuOpen = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.logginSubscription.unsubscribe();
    this.onSellerAdPageUnloggedSubscription.unsubscribe();
    this.windowSizeSubscription.unsubscribe();
  }
}
