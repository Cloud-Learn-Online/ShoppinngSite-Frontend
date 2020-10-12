import { Component, OnInit,Input } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { map} from 'rxjs/operators';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  user:IUser;
  user$ = this.sessionService.userObserv$.subscribe(
    resp => {
      this.user = resp
    });

  noOfCartItems:number;

  constructor(private sessionService: SessionService,
              private route:Router,
              private authService: AuthService) {

    this.sessionService.cartItemCount$.subscribe(
      num=> this.noOfCartItems = num
    );
  }

  navigate(){
    console.log("Logged");
    if(this.authService.isUserLoggedIn)
      this.route.navigate([`${this.user.email}/cart`]);
    else
      this.route.navigate(['/login']);
  }

  logout(){
    this.authService.logoutUser();
  }
}
