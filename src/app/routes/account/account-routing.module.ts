import { NgModule } from '@angular/core';
import { AccountModule } from './account.module';
import { RouterModule, Routes } from '@angular/router';

export const accountRoutes: Routes = [
    {
        path: 'compte',
        component: AccountModule,
        children: [
            {
                path: 'profil',
                title: 'Mon profil',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'annonces',
                title: 'Mes annonces',
                loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule)
            },
            {
                path: 'rdv',
                title: 'Mes RDV',
                loadChildren: () => import('./meetings/meetings.module').then(m => m.MeetingsModule)
            },
            {
                path: 'favoris',
                title: 'Mes favoris',
                loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }

