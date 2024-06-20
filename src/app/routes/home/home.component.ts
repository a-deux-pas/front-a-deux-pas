import { Component, OnInit } from '@angular/core';
import { LoggedInHomeComponent } from './logged-in-home/logged-in-home.component';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DefaultHomeComponent, LoggedInHomeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the isLoggedIn observable to keep track of the user's login status
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
