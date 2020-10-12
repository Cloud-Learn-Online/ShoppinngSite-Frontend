import { Component, ErrorHandler } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { CartItem } from '../models/cartItem';
import {BehaviorSubject, Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  cartSubject = new Subject<number>();
  removedItemSubject = new BehaviorSubject<number>(0);
  cartAction$= this.cartSubject.asObservable();
  email:string = (this.route.snapshot.paramMap.get('email'));
  errorMessage: String;

  cartItems$ : Observable<CartItem[]>;

  constructor(private shoppingCartService: ShoppingCartService,
              private route:ActivatedRoute,
              private errorHandler:ErrorHandler) {

    this.getCartItems();
  }
              
  removeItemFromCart(cartItemId:number, _event){
    this.shoppingCartService.removeItemFromCart(this.email, cartItemId)
    .subscribe(
      ()=>{this.getCartItems()}
    );
  }

  getCartItems() {
    this.cartItems$ = this.shoppingCartService.getListOfCartItems(this.email)
  }
}
         