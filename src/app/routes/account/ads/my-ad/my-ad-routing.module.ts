import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdComponent } from './my-ad.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '', component: MyAdComponent
  },
];

@NgModule({
  imports: [
    NgbNavModule,
    NgbCarouselModule,
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdModule { }
