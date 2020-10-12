import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUser } from './loginUser';
import { SessionService } from '../service/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = new LoginUser();
  constructor(private httpClient: HttpClient, private _auth: AuthService, private _router: Router, private sessionService: SessionService) { }

  ngOnInit() { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          this.sessionService.setProperties(res);
        },
        err => console.log(err),
        ()=>{
          this._router.navigate([`/${this.loginUserData.email}/products`]);
        }
      )
  }

  navigate(){
    this._router.navigate(['sign-up']);
  }
}
