import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsRoutingModule } from './adds-routing.module';
import { AddsComponent } from './adds.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';


@NgModule({
  declarations: [
    AddsComponent
  ],
  imports: [
    CommonModule,
    AddsRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    AddsComponent,
  ],
})
export class AddsModule { }
