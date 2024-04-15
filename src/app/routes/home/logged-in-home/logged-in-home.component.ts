import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrl: './logged-in-home.component.scss'
})
export class LoggedInHomeComponent {

  mobileNavbarMenuBoolean: boolean = false;

  mobileNavbarMenuToggle() {
    this.mobileNavbarMenuBoolean = !this.mobileNavbarMenuBoolean;
  }
}
