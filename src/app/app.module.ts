import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { StyleGuideRoutingModule } from './style-guide/style-guide-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultHomeComponent } from './routes/home/default-home/default-home.component';
import { AdListComponent } from './shared/components/ads/ad-list/ad-list.component';
import { AdFilterComponent } from './shared/components/ads/ad-filter/ad-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
    DefaultHomeComponent,
    AdListComponent,
    AdFilterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
