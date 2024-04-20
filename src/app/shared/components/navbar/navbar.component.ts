import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() accountMenuToggleOutput: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() isAccountMenuOpen: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    const routes = this.router.config;
    console.log('Liste des routes :', routes);
    console.log(routes[0]);
  }

  emitToggleAccountMenu() {
    this.accountMenuToggleOutput.emit();
    console.log(this.isAccountMenuOpen);
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
