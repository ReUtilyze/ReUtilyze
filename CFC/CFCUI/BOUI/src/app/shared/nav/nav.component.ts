import { AuthService } from './../../services/auth/auth.service'; 
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  uostatus: boolean = false;
  status: boolean = false;
  mstatus: boolean = false;
  langDropdownStatus: boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('langToggleButton') langToggleButton: ElementRef;
  @ViewChild('langMenu') langMenu: ElementRef;
  constructor(
      public authService: AuthService,
      private eRef: ElementRef,
      private renderer: Renderer2,
       
  ) {
      //this.authService.currentUser.subscribe(x => this.currentUser = x);
      this.renderer.listen('window', 'click',(e:Event)=>{
        /**
         * Only run when toggleButton is not clicked
         * If we don't check this, all clicks (even on the toggle button) gets into this
         * section which in the result we might never see the menu open!
         * And the menu itself is checked here, and it's where we check just outside of
         * the menu and button the condition abbove must close the menu
         */
        // if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
        //   this.status=false;
        // }
        
        // if(e.target !== this.langToggleButton.nativeElement && e.target!==this.langMenu.nativeElement){
        //   this.langDropdownStatus=false;
        // }

        // if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
        //   this.status=false;
        // }
    });
  }
  
  ngOnInit(): void {
    this.uostatus = false;
    this.status = false;
    this.mstatus = false; 
    this.langDropdownStatus = false;
  }

  clickEvent(event){
    this.status = !this.status;    
  }
  
  UserOptionsclickEvent(event){
    this.uostatus = !this.uostatus;    
  }

  MastersclickEvent(event){
    this.mstatus = !this.mstatus;    
  }

  useLanguage(language: string) {
    
  }

  clickLangEvent(event){
    this.langDropdownStatus = !this.langDropdownStatus;    
  }

  logout(event){
    this.clickEvent(event);
    this.authService.logout();
  }
}
