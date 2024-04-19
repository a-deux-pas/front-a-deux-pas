import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compte/profil',
    loadChildren: () => import('./routes/account/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'compte/annonces',
    loadChildren: () => import('./routes/account/ads/ads.module').then(m => m.AdsModule)
  },
  {
    path: 'compte/rdv',
    loadChildren: () => import('./routes/account/meetings/meetings.module').then(m => m.MeetingsModule)
  },
  {
    path: 'compte/favoris',
    loadChildren: () => import('./routes/account/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'annonce/creation',
    loadChildren: () => import('./routes/ads/create-ad/create-ad-routing.module').then(m => m.CreateAdModule)
  },
  {
    path: 'compte/annonce/mon-annonce/:id',
    loadChildren: () => import('./routes/account/ads/my-ad/my-ad-routing.module').then(m => m.MyAdModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
