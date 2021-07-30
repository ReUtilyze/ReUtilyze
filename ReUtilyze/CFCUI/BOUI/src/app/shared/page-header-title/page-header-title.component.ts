import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-page-header-title',
  templateUrl: './page-header-title.component.html',
  styleUrls: ['./page-header-title.component.css']
})
export class PageHeaderTitleComponent implements OnInit {
  pageTitle: string;
  backLink: boolean;
  currentUrl: string;
  requestId: any;
  statusId: number;
  cancelButtonActive: boolean = false;
  constructor(
    private router: Router,  
    private activatedRoute: ActivatedRoute
     
  ) {  
  }
  
  ngOnInit() {  
     
  }  

  getChild(activatedRoute: ActivatedRoute) {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }
  } 
}
