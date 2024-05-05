import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites.component';

const favoritesRoutes: Routes = [
  { path: '', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(favoritesRoutes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
