import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rewards for Recycling - By Ingram Micro';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(
      (param:any) =>{
        if(param.token){
          let token = {token: param.token};
          if(!this.authService.getToken()){
            localStorage.setItem('token', JSON.stringify(token));
          }
        }
      }
    )
  }
}
