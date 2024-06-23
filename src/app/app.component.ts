import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { DisplayManagementService } from './shared/services/display-management.service';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { AdService } from './routes/ad/ad.service';

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
  windowSizeSubscription!: Subscription;
  onSellerAdPageUnlogged!: boolean

  constructor(
    private displayManagementService: DisplayManagementService,
    private authService: AuthService,
    private adService: AdService
  ) { }

  accountNavbarMenuToggle() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  ngOnInit() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
      console.log('is user logged in?', this.isLoggedIn);
    });
  }

  ngAfterViewInit(): void {
    if (!this.isLoggedIn) {
      this.adService.sellerAdPageLoaded$.subscribe(hasAdAndSellerId => {
        this.onSellerAdPageUnlogged = hasAdAndSellerId;
        console.log('hasAdAndSellerId:: ', hasAdAndSellerId)
      });
    }
  }
}
