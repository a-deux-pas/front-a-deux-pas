import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsRoutingModule } from './adds-routing.module';
import { AddsComponent } from './adds.component';
import { ComponentsModule } from '../../../shared/components/components.module';


@NgModule({
  declarations: [
    AddsComponent
  ],
  imports: [
    CommonModule,
    AddsRoutingModule,
    ComponentsModule
  ],
  exports: [
    AddsComponent,
  ],
})
export class AddsModule { }
