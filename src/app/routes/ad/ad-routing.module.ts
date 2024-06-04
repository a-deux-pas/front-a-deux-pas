import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const adRoutes: Routes = [
    {
        path: 'annonce',
        children: [
            {
                path: 'creation',
                loadComponent: () => import('./create-ad/create-ad.component').then(mod => mod.CreateAdComponent)
            },
            {
                path: ':sellerId/:adId',
                loadComponent: () => import('./seller-ad/seller-ad.component').then(mod => mod.SellerAdComponent),
                canActivate: [authGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adRoutes)],
    exports: [RouterModule]
})
export class AdRoutingModule { }
