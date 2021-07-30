import { GetCustomerPointsService } from './../../../services/get-customer-points/get-customer-points.service';
import { GetCustomerRequestsService } from './../../../services/get-customer-requests/get-customer-requests.service';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  searchForm: FormGroup;
  orders: any;
  status: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizeOptions = [10, 25, 50, 100];
  statusFilterQuery : string = '';
  fromDateFilterQuery : string = '';
  toDateFilterQuery : string = '';
  currentPageRange : any;
  minDate : Date;
  searchUrl = environment.apiUrl + 'api/RecycleRequest/GetRequests';
  availablePoints: number;
  constructor(
    private getCustomerRequestsService: GetCustomerRequestsService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private getCustomerPointsService: GetCustomerPointsService
  ) { }

  ngOnInit(): void {
    this.getSearchData(this.searchUrl); 
    this.getCustomerPointsService.get()
    .subscribe(
      (response: any)=>{
        this.availablePoints = response.WalletBalance ? response.WalletBalance : 0;
      }
    )   
  }

  getSearchData(url: string): void{
    this.getCustomerRequestsService.get(url)
    .subscribe(
      (response: any) => {
        this.orders = response;
        this.count = response.length;
    });
  }

  onPageSizeChange(event: any): void{
    this.page = 1;
    this.tableSize = event.target.value;
  }

  tabSize(event: any){
    this.page = event;
  }  

}
