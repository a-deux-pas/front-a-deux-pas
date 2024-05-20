import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
                loadComponent: () => import('./seller-ad/seller-ad.component').then(mod => mod.SellerAdComponent)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adRoutes)],
    exports: [RouterModule]
})
export class AdRoutingModule { }
