import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'annonce',
    loadChildren: () => import('./routes/ad/ad-routing.module').then(mod => mod.AdRoutingModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account-routing.module').then(mod => mod.AccountRoutingModule)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./routes/register/register.component').then(mod => mod.RegisterComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
