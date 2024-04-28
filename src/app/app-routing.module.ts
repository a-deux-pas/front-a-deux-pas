import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'annonce',
    loadChildren: () => import('./routes/ad/ad.module').then(m => m.AdModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account.module').then(m => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
