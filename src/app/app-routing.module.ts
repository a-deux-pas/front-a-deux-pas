import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/default-home/default-home.module').then(m => m.DefaultHomeModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./routes/home/logged-in-home/logged-in-home.module').then(m => m.LoggedInHomeModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account.module').then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
