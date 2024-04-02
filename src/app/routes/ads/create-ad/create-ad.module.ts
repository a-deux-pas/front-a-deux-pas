import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdComponent } from './create-ad.component';
import { ComponentModule } from '../../../shared/component/component.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'annonce/je-cree-une-annonce', component: CreateAdComponent },
]

@NgModule({
  declarations: [
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CreateAdModule { }
