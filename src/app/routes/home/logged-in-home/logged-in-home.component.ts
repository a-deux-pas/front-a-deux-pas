import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrl: './logged-in-home.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class LoggedInHomeComponent {}
