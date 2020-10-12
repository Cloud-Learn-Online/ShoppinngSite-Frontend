import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user:IUser;
  private token:string;
  private userSub = new BehaviorSubject<IUser>({} as IUser); 
  userObserv$= this.userSub.asObservable();
  cartItemCount$ = this.shoppingCartService.cartItemCount$;
  constructor(private authService:AuthService,
              private shoppingCartService: ShoppingCartService) {   
    if(this.authService.isUserLoggedIn()){
      this.getProperties();
    }
  }

  getUser() {
    if(this.authService.isUserLoggedIn()){
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }else{
      console.log("Helko there Is an error");
    }
  }

  setProperties( responce:any){
    sessionStorage.setItem('user',JSON.stringify(responce.user));
    this.authService.setToken(responce.token);
    this.setToObservable(responce.user);
    this.shoppingCartService.updateCartItemsCount(this.user.email);
  }

  private setToObservable(user: IUser) {
    this.user=user;
    this.userSub.next(user);
  }

  getProperties(){
      this.getUser();
      this.setToObservable(this.user);
      this.shoppingCartService.updateCartItemsCount(this.user.email);
  }
}
