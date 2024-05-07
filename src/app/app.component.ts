import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MynavbarComponent } from './shared/components/mynavbar/mynavbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, MynavbarComponent],
})
export class AppComponent {
  title = 'front';
}
