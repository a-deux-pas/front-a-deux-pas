import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-default-home',
  templateUrl: './default-home.component.html',
  styleUrl: './default-home.component.scss',
  standalone: true,
  imports: [HeaderComponent]
})
export class DefaultHomeComponent {

}
