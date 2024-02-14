import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuideComponent } from './style-guide/style-guide.component';

const routes: Routes = [{path: 'style-guide', component: StyleGuideComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
