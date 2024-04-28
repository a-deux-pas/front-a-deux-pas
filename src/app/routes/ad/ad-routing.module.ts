import { NgModule } from '@angular/core';
import { AdModule } from './ad.module';
import { RouterModule, Routes } from '@angular/router';

const adsRoutes: Routes = [
    {
        path: 'annonce',
        component: AdModule,
        children: [
            {
                path: 'creation',
                loadChildren: () => import('./create-ad/create-ad.module').then(m => m.CreatedAdModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adsRoutes)],
    exports: [RouterModule]
})
export class AdRoutingModule { }
