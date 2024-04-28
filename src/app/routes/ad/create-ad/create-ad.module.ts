import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdComponent } from './create-ad.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { CreateAdRoutingModule } from './create-ad-routing.module';

@NgModule({
  declarations: [
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    CreateAdRoutingModule
  ],
  exports: [
    CreateAdComponent
  ]
})
export class CreatedAdModule { }
