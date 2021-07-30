import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {
  txnId: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(
      (param:any) =>{
        this.txnId = param.get('id');
    })
  }

  redirectToShoppingCart(){
    location.href= 'http://54.169.146.198/webshop/'; 
  }
}
