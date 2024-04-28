import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StyleGuideComponent } from '../style/style-guide/style-guide.component';
import { StyleGuideRoutingModule } from '../style/style-guide/style-guide-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { DefaultHomeComponent } from './routes/home/default-home/default-home.component';
import { AdListComponent } from './shared/components/ads/ad-list/ad-list.component';
import { AdFiltersComponent } from './shared/components/ads/ad-filters/ad-filters.component';
import { AdCardComponent } from './shared/components/ads/ad-card/ad-card.component';

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
    DefaultHomeComponent,
    AdListComponent,
    AdFiltersComponent,
    AdCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
