import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map, filter, flatMap } from "rxjs/operators";
import { IResponce } from '../models/responce';
import { ShoppingCart } from '../models/shoppingCart';
import { ShoppingCartItems } from '../models/shoppingCartItems';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCartUrl=`http://localhost:6060/shoppingSite/shoppingSite/4/cart/items`;
  noOfShoppingCartItems = 0;
  private responce$ = this.http.get<IResponce<ShoppingCart>>(this.shoppingCartUrl).
                      pipe(map(x=>x.data));
   
  cartItemSub = new BehaviorSubject<number>(this.noOfShoppingCartItems); 
  cartItemObserv$= this.cartItemSub.asObservable();
  constructor(private http : HttpClient) {
  }

  addItemToCart(item_:Item, quantity_: number){

    let cartItem :ShoppingCartItems ={
       id:0,
       item:item_,
       quantity:quantity_  
      };
      let url='http://localhost:6060/shoppingSite/shoppingSite/4/cart/add';
      this.http.post<IResponce<ShoppingCart>>(url,cartItem).subscribe();
      this.noOfShoppingCartItems++;
      this.cartItemSub.next(this.noOfShoppingCartItems);
  }


  removeItemFromCart(cartItemId:number){
    this.http.delete<IResponce<String>>
    (`http://localhost:6060/shoppingSite/shoppingSite/4/cart/items/remove/${cartItemId}`)
    .subscribe();
    this.noOfShoppingCartItems--;
    this.cartItemSub.next(this.noOfShoppingCartItems);
  }

  getListOfCartItems():Observable<ShoppingCartItems[]>{
   let x$=this.responce$.pipe(
      map(responce => responce.cart_items as ShoppingCartItems[]),
      catchError(this.handleError)
    );
    return x$;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status},error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}