import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  accountNavbarMenuToggle() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  ngOnInit() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      console.log('user logged in', status);
    });
  }
}
