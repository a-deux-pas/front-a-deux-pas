import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { accountRoutes } from '../../../routes/account/account-routing.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent, LoginComponent]
})
export class NavbarComponent {
  @Output() accountMenuToggleOutput: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() isAccountMenuOpen: boolean = false;
  accountRoutes = accountRoutes;
  @Input() isLoggedIn!: boolean
  @Input() onSellerAdPageUnlogged: boolean = false;

  constructor(private authService: AuthService, public modalService: NgbModal) { }

  emitToggleAccountMenu() {
    this.accountMenuToggleOutput.emit();
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  logout() {
    this.authService.logout();
  }

  openModal() {
    this.modalService.open(LoginComponent);
  }
}
