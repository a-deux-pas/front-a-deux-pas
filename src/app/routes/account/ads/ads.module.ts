import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './components/my-ads/ads.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';


@NgModule({
  declarations: [
    AdsComponent
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    AdsComponent,
  ],
})
export class AdsModule { }
