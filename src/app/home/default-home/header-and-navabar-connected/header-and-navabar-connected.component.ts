import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-and-navabar-connected',
  templateUrl: './header-and-navabar-connected.component.html',
  styleUrl: './header-and-navabar-connected.component.scss',
})
export class HeaderAndNavabarConnectedComponent {
  @Output() toggleMobileNavbarMenuOutput: EventEmitter<void> =
    new EventEmitter<void>();

  @Input() menuMobileIsOpenBoolean: boolean;

  menuDesktopIsOpenBoolean: boolean;
  navbarIconSelectedNumber: number;

  constructor() {
    this.menuMobileIsOpenBoolean = false; // Valeur par défaut, avant l'arrivée de la valeur de l'input
    this.menuDesktopIsOpenBoolean = false;
    this.navbarIconSelectedNumber = 1;
  }

  // Méthode pour basculer la visibilité des divs
  toggleMobileNavbarMenu() {
    this.toggleMobileNavbarMenuOutput.emit();
  }

  toggleDesktopNavbarMenu() {
    this.menuDesktopIsOpenBoolean = !this.menuDesktopIsOpenBoolean;
  }

  // Sélecteur de la navbar, par défaut a 1 (1ère icone, Accueil)
  navbarIconSelectedFunction(iconNumber: number) {
    this.navbarIconSelectedNumber = iconNumber;
  }
}
