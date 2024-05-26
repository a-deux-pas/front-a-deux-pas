import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdListComponent } from '../../../shared/components/ads/ad-list/ad-list.component';

@Component({
  selector: 'app-default-home',
  templateUrl: './default-home.component.html',
  styleUrl: './default-home.component.scss',
  standalone: true,
  imports: [HeaderComponent, CategoriesComponent, AdListComponent],
})
export class DefaultHomeComponent {}
