import { Component, OnInit, OnChanges } from '@angular/core';
import { Item } from '../models/item';
import { ShoppingCartService } from '../service/shopping-cart.service';
import {map} from 'rxjs/operators';
import { ShoppingCart } from '../models/shoppingCart';
import { ShoppingCartItems } from '../models/shoppingCartItems';
import {combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartSubject = new BehaviorSubject<number>(-1);
  cartAction$= this.cartSubject.asObservable();
  errorMessage: String;
  cartItems$= combineLatest([this.shoppingCartService.getListOfCartItems(),
              this.cartAction$]).pipe(
                map(([cartItems,cartItemId])=>{
                  let foundCartItem = cartItems.findIndex(cartItem=> cartItem.id==cartItemId);
                  if(foundCartItem !=-1)
                    cartItems.splice(foundCartItem,1) as ShoppingCartItems[];
                  return cartItems;
                }));

  constructor(private shoppingCartService: ShoppingCartService) {
    
  }
  

  ngOnInit() {
    this.cartItems$.subscribe(x=>{
      x.filter(val=>console.log("constructor"+val))});
  }

  removeItemFromCart(cartItemId:number,_event){
   // event.stopPropagation();
   //event.stopImmediatePropagation();
    console.log(cartItemId);
    this.shoppingCartService.removeItemFromCart(cartItemId);
    this.cartSubject.next(cartItemId);
  }
}
