import { AuthService } from './../../services/auth/auth.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  status: boolean = false;
  langDropdownStatus: boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('langToggleButton') langToggleButton: ElementRef;
  @ViewChild('langMenu') langMenu: ElementRef;
  constructor(
      public authService: AuthService,
      private eRef: ElementRef,
      private renderer: Renderer2
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
        if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
          this.status=false;
        }
        
        // if(e.target !== this.langToggleButton.nativeElement && e.target!==this.langMenu.nativeElement){
        //   this.langDropdownStatus=false;
        // }
    });
  }
  
  ngOnInit(): void {
    this.status = false;
    this.langDropdownStatus = false;
  }
  
  clickEvent(event: any){
    this.status = !this.status;    
  }

  clickLangEvent(event : any){
    this.langDropdownStatus = !this.langDropdownStatus;    
  }

  logout(event: any){
    this.clickEvent(event);
    this.authService.logout();
  }
}
