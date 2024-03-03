import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAccountComponent } from './tabs-account/tabs-account.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TabsAccountComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    RouterModule
  ],
  exports: [
    TabsAccountComponent
  ]
})
export class ComponentsModule { }
