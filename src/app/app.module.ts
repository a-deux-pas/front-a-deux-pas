import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleGuideComponent } from '../style/style-guide/style-guide.component';
import { StyleGuideRoutingModule } from '../style/style-guide/style-guide-routing.module';
import { AdFormComponent } from './routes/ads/create-ad/ad-form.component';
import { AdModule } from './routes/ads/create-ad/ad.module';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { CloudinaryModule } from '@cloudinary/ng';
import { TodeleteComponent } from './routes/ads/todelete/todelete.component';

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
    AdFormComponent,
    TodeleteComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
    AdModule,
    HttpClientModule,
    NgxDropzoneModule,
    CloudinaryModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
