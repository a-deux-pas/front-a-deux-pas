import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const accountRoutes: Routes = [
    {
        path: 'compte',
        children: [
            {
                path: 'profil',
                title: 'Mon profil',
                loadChildren: () => import('./profile/profile-routing.module').then(mod => mod.ProfileRoutingModule)
            },
            {
                path: 'annonces',
                title: 'Mes annonces',
                loadChildren: () => import('./ads/ads-routing.module').then(mod => mod.AdsRoutingModule)
            },
            {
                path: 'rdv',
                title: 'Mes RDV',
                loadChildren: () => import('./meetings/meetings-routing.module').then(mod => mod.MeetingsRoutingModule)
            },
            {
                path: 'favoris',
                title: 'Mes favoris',
                loadChildren: () => import('./favorites/favorites-routing.module').then(mod => mod.FavoritesRoutingModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }

