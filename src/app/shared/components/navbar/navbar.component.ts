import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() accountMenuToggleOutput: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() isAccountMenuOpen: boolean;

  navbarIconSelectedNumber: number;

  constructor() {
    this.isAccountMenuOpen = false;
    this.navbarIconSelectedNumber = 1;
  }

  emitToggleAccountMenu() {
    this.accountMenuToggleOutput.emit();
    console.log(this.isAccountMenuOpen);
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  // Sélecteur de la navbar, par défaut a 1 (1ère icone, Accueil)
  navbarIconSelectedFunction(iconNumber: number) {
    this.navbarIconSelectedNumber = iconNumber;
  }
}
