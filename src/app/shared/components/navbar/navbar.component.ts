import { Component, Output, EventEmitter, Input } from '@angular/core';
import { accountRoutes } from '../../../routes/account/account-routing.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent]
})
export class NavbarComponent {
  @Output() accountMenuToggleOutput: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() isAccountMenuOpen: boolean = false;
  accountRoutes = accountRoutes;
  @Input() isLoggedIn: boolean = false;
  isRegistrationPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      this.isRegistrationPage = this.router.url.includes('/inscription');
    });
  }

  emitToggleAccountMenu() {
    this.accountMenuToggleOutput.emit();
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
