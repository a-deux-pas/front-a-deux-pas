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
import { AdRoutingModule } from './routes/ad/ad-routing.module';
import { AccountRoutingModule } from './routes/account/account-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
    AdRoutingModule,
    AccountRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
