import { Component, Output, EventEmitter, Input } from '@angular/core';
import { accountRoutes } from '../../../routes/account/account-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() accountMenuToggleOutput: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() isAccountMenuOpen: boolean = false;
  accountRoutes = accountRoutes;

  emitToggleAccountMenu() {
    this.accountMenuToggleOutput.emit();
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
