import { AlertModule } from './shared/alert/alert.module';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RecycleFormComponent } from './recycle-form/recycle-form/recycle-form.component';
import { PageHeaderTitleComponent } from './shared/page-header-title/page-header-title.component';
import { NavComponent } from './shared/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuccessPageComponent } from './success-page/success-page/success-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerLoginComponent } from './customer-login/customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration/customer-registration.component';
import { CustomerProfileModule } from './customer-profile/customer-profile.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_helpers/auth-guard/auth-guard.service';
import { FutureRecycleRequestComponent } from './future-recycle-request/future-recycle-request/future-recycle-request.component';
import { TokenInterceptor } from './_interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageHeaderTitleComponent,
    RecycleFormComponent,
    SuccessPageComponent,
    CustomerLoginComponent,
    CustomerRegistrationComponent,
    LoaderComponent,
    FutureRecycleRequestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
    CustomerProfileModule,
    AlertModule
  ],
  providers: [
    DatePipe,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
