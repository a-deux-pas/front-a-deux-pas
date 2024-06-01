import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuideComponent } from './style-guide.component';

const styleGuideRoutes: Routes = [
  { path: 'style-guide', component: StyleGuideComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(styleGuideRoutes),
  ],
  exports: [RouterModule]
})
export class StyleGuideRoutingModule { }
