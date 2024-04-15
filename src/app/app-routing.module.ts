import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/default-home/default-home.module').then(m => m.DefaultHomeModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./routes/home/logged-in-home/logged-in-home.module').then(m => m.LoggedInHomeModule)
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
