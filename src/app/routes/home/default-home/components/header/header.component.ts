import { Component, ViewEncapsulation } from '@angular/core';
import { SearchBarComponent } from '../../../../../shared/components/navbar/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SearchBarComponent]
})
export class HeaderComponent {}
