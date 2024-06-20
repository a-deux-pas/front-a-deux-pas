import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AccountRoutingModule } from './app/routes/account/account-routing.module';
import { AdRoutingModule } from './app/routes/ad/ad-routing.module';
import { StyleGuideRoutingModule } from './style/style-guide/style-guide-routing.module';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptor } from './app/shared/interceptors/auth-interceptor';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, NgbModule, NgSelectModule, FormsModule, AppRoutingModule, StyleGuideRoutingModule, AdRoutingModule, AccountRoutingModule),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
  .catch(err => console.error(err));
