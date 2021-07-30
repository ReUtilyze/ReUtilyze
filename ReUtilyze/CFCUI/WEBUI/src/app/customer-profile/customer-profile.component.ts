import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  currentTab: string = 'tab-customer-orders';
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  switchTab(id: string){
    this.currentTab = id;
  }

}
