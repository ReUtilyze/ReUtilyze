import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-upcomingorders',
  templateUrl: './customer-upcomingorders.component.html',
  styleUrls: ['./customer-upcomingorders.component.css']
})
export class CustomerUpcomingordersComponent implements OnInit {

  orders: any = [];
  count: number = 0;
  page = 1;
  tableSize = 5;
  tableSizeOptions = [5, 10, 25, 50, 100];
  constructor() { }

  ngOnInit(): void {
    this.orders =[
      {'order_id': '001', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '002', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '003', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '004', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '005', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '006', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '007', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '008', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '009', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '010', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '011', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '012', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '013', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '014', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '015', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '016', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '017', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'},
      {'order_id': '018', 'request_date': '01-01-2021', 'device_type': 'Laptop', 'device_brand': 'ASUS', 'device_model': 'ASORD1234'}
    ];

    this.count = this.orders.length;
  }

  onPageSizeChange(event: any): void{
    this.page = 1;
    this.tableSize = event.target.value;
  }

  tabSize(event: any){
    this.page = event;
  }  

}
