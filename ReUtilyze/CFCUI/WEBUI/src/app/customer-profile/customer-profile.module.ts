import { CustomerProfileComponent } from './customer-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddressComponent } from './customer-address/customer-address/customer-address.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard/customer-dashboard.component';
import { CustomerProfileUpdateComponent } from './customer-profile-update/customer-profile-update/customer-profile-update.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders/customer-orders.component';
import { CustomerUpcomingordersComponent } from './customer-upcomingorders/customer-upcomingorders/customer-upcomingorders.component';
import { CustomerRedeemPointsComponent } from './customer-redeem-points/customer-redeem-points/customer-redeem-points.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CustomerProfileComponent,
    CustomerAddressComponent,
    CustomerDashboardComponent,
    CustomerProfileUpdateComponent,
    CustomerOrdersComponent,
    CustomerUpcomingordersComponent,
    CustomerRedeemPointsComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class CustomerProfileModule { }
