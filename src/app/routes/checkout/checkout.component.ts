import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
