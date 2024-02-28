import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account/account-routing.module';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccountModule,
    AccountRoutingModule
  ]
})
export class UserModule { }
