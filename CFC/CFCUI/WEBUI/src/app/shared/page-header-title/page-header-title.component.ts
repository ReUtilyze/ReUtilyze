// import { EncryptionPipe } from './../../_pipes/encryption.pipe';
// import { DisplayRmaHeaderService } from './../../services/display-rma-header/display-rma-header.service';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-page-header-title',
  templateUrl: './page-header-title.component.html',
  styleUrls: ['./page-header-title.component.css']
})
export class PageHeaderTitleComponent implements OnInit {
  // pageTitle: string;
  // backLink: boolean;
  // currentUrl: string;
  // requestId: any;
  // statusId: number;
  cancelButtonActive: boolean = false;
  constructor(
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    // private displayRmaHeaderService: DisplayRmaHeaderService,
    // private conversion: EncryptionPipe
  ) {  
  }
  
  ngOnInit() {  
    // this.router.events
    // .pipe(  
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((params: any) => {  
    //   this.currentUrl = params.url;
    //   const rt = this.getChild(this.activatedRoute);  
    //   rt.data.subscribe(data => {  
    //     this.pageTitle = 'eRMA.'+data.pageTitle+'.Title';
    //     this.backLink = data.backLink;
    //     this.cancelButtonActive = false;
    //     if(rt.component.name == 'DisplayRmaComponent' && params.url.includes('web/rma/display')){
    //       this.requestId = params.url.split('/').pop();
    //       if(this.requestId){
    //         this.displayRmaHeaderService.getData(this.requestId)
    //         .subscribe(
    //           (response: any) =>{
    //             this.statusId = response.data.request.statusId;
    //             this.cancelButtonActive = this.statusId == 3 || this.statusId == 7;
    //           }
    //         )
    //       }
    //     }
    //   });  
    // });  
  }  

  // getChild(activatedRoute: ActivatedRoute) {  
  //   if (activatedRoute.firstChild) {  
  //     return this.getChild(activatedRoute.firstChild);  
  //   } else {  
  //     return activatedRoute;  
  //   }
  // } 
}
