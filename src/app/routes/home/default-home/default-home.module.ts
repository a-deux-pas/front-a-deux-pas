import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultHomeRoutingModule } from './default-home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DefaultHomeComponent } from './default-home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DefaultHomeComponent
  ],
  imports: [
    CommonModule,
    DefaultHomeRoutingModule,
  ],
  exports: [
    DefaultHomeComponent,
  ]
})
export class DefaultHomeModule { }
