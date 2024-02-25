import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuideComponent } from './style-guide/style-guide.component';

const routes: Routes = [
  { path: 'style-guide', component: StyleGuideComponent },
  { path: 'account/profile', loadChildren: () => import('./user/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
