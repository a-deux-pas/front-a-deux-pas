import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    FavoritesComponent,
  ],
})
export class FavoritesModule { }
