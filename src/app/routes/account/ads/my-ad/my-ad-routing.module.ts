import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdComponent } from './my-ad.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '', component: MyAdComponent
  },
];

@NgModule({
  declarations: [
    MyAdComponent
  ],
  imports: [
    NgbNavModule,
    NgbCarouselModule,
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdModule { }
