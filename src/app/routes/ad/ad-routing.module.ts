import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const adsRoutes: Routes = [
    {
        path: 'annonce',
        children: [
            {
                path: 'creation',
                loadComponent: () => import('./create-ad/create-ad.component').then(mod => mod.CreateAdComponent)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adsRoutes)],
    exports: [RouterModule]
})
export class AdRoutingModule { }
