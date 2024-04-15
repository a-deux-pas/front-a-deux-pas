import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  mobileNavbarMenuBoolean: boolean = false;

  mobileNavbarMenuToggle() {
    this.mobileNavbarMenuBoolean = !this.mobileNavbarMenuBoolean;
  }
}
