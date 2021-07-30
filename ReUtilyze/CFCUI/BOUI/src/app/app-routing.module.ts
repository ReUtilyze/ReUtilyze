import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClaimrequestlistComponent } from './features/claimrequestlist/claimrequestlist.component';
import { ClaimrequestdetailsComponent } from './features/claimrequestdetails/claimrequestdetails.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { ProfileAuthGuard } from './services/profile-auth-guard/profile-auth-guard.service';

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot([
    { path:'login', component: LoginComponent, data : { title: 'BackOfficeLogin', pageTitle: 'BackOfficeLogin', backLink: false } },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data : { title: 'Dashboard', pageTitle: 'Dashboard', backLink: false }  },
    { path: 'claimlist/:CommandType', component: ClaimrequestlistComponent, canActivate: [AuthGuard], data : { title: 'Claimrequestlist', pageTitle: 'Claimrequestlist', backLink: false } },
    { path:'claimrequestdetails/:id', component: ClaimrequestdetailsComponent, canActivate: [AuthGuard], data : { title: 'Claimrequestdetails', pageTitle: 'Claimrequestdetails', backLink: false } },  
    {path: '**',redirectTo: 'dashboard'}  
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
