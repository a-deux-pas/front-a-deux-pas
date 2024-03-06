import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { ComponentsModule } from '../../../shared/components/components.module';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    ComponentsModule
  ],
  exports: [
    FavoritesComponent,
  ],
})
export class FavoritesModule { }
