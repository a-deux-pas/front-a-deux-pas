import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const accountRoutes: Routes = [
    {
        canActivate: [authGuard],
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
                loadChildren: () => import('./ads/ads-routing.module').then(mod => mod.AdsRoutingModule),
                canActivate: [authGuard],
            },
            {
                path: 'rdv',
                title: 'Mes RDV',
                loadChildren: () => import('./meetings/meetings-routing.module').then(mod => mod.MeetingsRoutingModule),
            },
            {
                path: 'favoris',
                title: 'Mes favoris',
                loadChildren: () => import('./favorites/favorites-routing.module').then(mod => mod.FavoritesRoutingModule),
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
