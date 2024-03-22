import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { HttpClientModule } from '@angular/common/http';
import { StyleGuideRoutingModule } from './style-guide/style-guide-routing.module';

@NgModule({
  declarations: [AppComponent, StyleGuideComponent],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbAlertModule,
    ReactiveFormsModule,
    StyleGuideRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
