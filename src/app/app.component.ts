import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent {
  title = 'front';
  isAccountMenuOpen: boolean = false;

  accountNavbarMenuToggle() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
