import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.css']
})
export class BackLinkComponent implements OnInit {
  backLinkUrl: string;
  constructor(
    private router: Router,  
    private activatedRoute: ActivatedRoute
  ) {  
  }

  ngOnInit() {  
    this.router.events.pipe(  
    filter(event => event instanceof NavigationEnd),  
    ).subscribe(() => {  
      const rt = this.getChild(this.activatedRoute);  
      rt.data.subscribe(data => {  
        this.backLinkUrl = data.backLinkUrl;
      });  
    });  
  }  

  getChild(activatedRoute: ActivatedRoute) {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }
  }  

}
