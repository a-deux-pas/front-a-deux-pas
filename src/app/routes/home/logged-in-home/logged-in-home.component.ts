import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoggedInHomeRoutingModule } from './logged-in-home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrl: './logged-in-home.component.scss',
  standalone: true,
  imports: [CommonModule, LoggedInHomeRoutingModule, NgbModule],
})
export class LoggedInHomeComponent {
  showSuccessAlert!: boolean;
}
