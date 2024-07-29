import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';


export const accountRoutes: Routes = [
    {
        path: 'compte',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'profil',
                title: 'Mon profil',
                loadComponent: () => import('./profile/profile.component').then(mod => mod.ProfileComponent)
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
                loadComponent: () => import('./favorites/favorites.component').then(mod => mod.FavoritesComponent)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
