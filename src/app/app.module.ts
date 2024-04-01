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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CloudinaryModule } from '@cloudinary/ng';
import { ComponentModule } from './shared/component/component.module';
import { CreateAdModule } from './routes/ads/create-ad/create-ad.module';


@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
    HttpClientModule,
    NgxDropzoneModule,
    CloudinaryModule,
    ComponentModule,
    CreateAdModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
