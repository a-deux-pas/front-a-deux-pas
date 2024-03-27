import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { StyleGuideRoutingModule } from './style-guide/style-guide-routing.module';
import { HeaderAndNavbarNotConnectedComponent } from './home/default-home/header-and-navbar-not-connected/header-and-navbar-not-connected.component';
import { FooterComponent } from './home/default-home/footer/footer.component';
import { HeaderAndNavabarConnectedComponent } from './home/default-home/header-and-navabar-connected/header-and-navabar-connected.component';

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
    HeaderAndNavbarNotConnectedComponent,
    FooterComponent,
    HeaderAndNavabarConnectedComponent,
  ],
  imports: [
    BrowserModule,
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
