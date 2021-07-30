import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';   
import { ChartsModule } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import { AlertModule } from './shared/alert/alert.module';
import { RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { PageHeaderTitleComponent } from './shared/page-header-title/page-header-title.component';
import { BackLinkComponent } from './shared/back-link/back-link.component';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClaimrequestlistComponent } from './features/claimrequestlist/claimrequestlist.component';
import { ClaimrequestdetailsComponent } from './features/claimrequestdetails/claimrequestdetails.component';
 import { GetClaimRequestDataService } from './services/get-claimrequestdata/get-claim-request-data.service';
 import { HttpClientModule } from '@angular/common/http';
 import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { NgxPaginationModule } from 'ngx-pagination';
 import { FormsModule } from '@angular/forms';
 import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { ProfileAuthGuard } from './services/profile-auth-guard/profile-auth-guard.service';
import { TokenInterceptor } from './auth-interceptor/token.interceptor'

 import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
  

 export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD-MM-YYYY',
    showWeekNumbers: false,
    adaptivePosition: false
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BackLinkComponent,
    LoaderComponent,
    PageHeaderTitleComponent,
    DashboardComponent,
    ClaimrequestlistComponent,
    ClaimrequestdetailsComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    MenubarModule,
    AlertModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    TabsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [GetClaimRequestDataService,DatePipe, { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuard,
    Title,
    ProfileAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  //providers: [GetClaimRequestDataService,TabsetConfig,DatePipe, { provide: BsDatepickerConfig, useFactory: getDatepickerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
