import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { DisplayManagementService } from './shared/services/display-management.service';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { AdService } from './shared/services/ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front';
  isAccountMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isBigScreen: boolean | undefined;
  isDataLoaded: boolean = false;
  windowSizeSubscription!: Subscription;
  onSellerAdPageUnlogged!: boolean

  constructor(
    private displayManagementService: DisplayManagementService,
    private authService: AuthService,
    private adService: AdService
  ) { }

  ngOnInit() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      console.log('is user logged in?', this.isLoggedIn);
    });

    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });

    setTimeout(() => {
      this.isDataLoaded = true;
    }, 1000);
  }

  ngAfterViewInit(): void {
    if (!this.isLoggedIn) {
      this.adService.sellerAdPageLoaded$.subscribe(hasAdAndSellerId => {
        this.onSellerAdPageUnlogged = hasAdAndSellerId;
      });
    }
  }

  accountNavbarMenuToggle(isOpen: boolean) {
    this.isAccountMenuOpen = isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInsideMenu = targetElement.closest('#account-menu');
    const clickedDesktopIcon = targetElement.closest('#desktop-account-icon');

    // Only close the menu if clicked outside the menu and not on the desktop account icon
    if (this.isAccountMenuOpen && clickedInsideMenu === null && clickedDesktopIcon === null) {
      this.isAccountMenuOpen = false;
    }
  }
}
