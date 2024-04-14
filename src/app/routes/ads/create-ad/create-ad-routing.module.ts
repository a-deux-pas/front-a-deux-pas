import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdComponent } from './create-ad.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CreateAdComponent },
]

@NgModule({
  declarations: [
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CreateAdModule { }
