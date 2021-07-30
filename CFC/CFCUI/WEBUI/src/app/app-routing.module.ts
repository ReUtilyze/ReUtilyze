import { FutureRecycleRequestComponent } from './future-recycle-request/future-recycle-request/future-recycle-request.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration/customer-registration.component';
import { CustomerLoginComponent } from './customer-login/customer-login/customer-login.component';
import { SuccessPageComponent } from './success-page/success-page/success-page.component';
import { RecycleFormComponent } from './recycle-form/recycle-form/recycle-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth-guard/auth-guard.service';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path:'web/customer/recycle-product', component: RecycleFormComponent, canActivate: [AuthGuard]},
      { path:'web/transaction/success/:id', component: SuccessPageComponent, canActivate: [AuthGuard]},
      { path:'web/customer/login', component: CustomerLoginComponent},
      { path:'web/customer/register', component: CustomerRegistrationComponent},
      { path:'web/customer/profile', component: CustomerProfileComponent, canActivate: [AuthGuard]},
      { path:'web/customer/future-recycle/product', component:FutureRecycleRequestComponent},
      { path: '**', redirectTo: 'web/customer/recycle-product' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
