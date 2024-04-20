import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './account.module';

const routes: Routes = [
  {
    path: 'compte',
    component:  AccountModule,
    children: [
      {
        path: 'profil',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'annonces',
        loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule)
      },
      {
        path: 'rdv',
        loadChildren: () => import('./meetings/meetings.module').then(m => m.MeetingsModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
