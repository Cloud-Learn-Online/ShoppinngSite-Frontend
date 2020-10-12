import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable, throwError, BehaviorSubject, combineLatest } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map, filter, flatMap } from "rxjs/operators";
import { IResponce } from '../models/responce';
import { IShoppingCart } from '../models/shoppingCart';
import { IShoppingCartReq } from '../models/shoppingCartReq';
import { IShoppingCartItems } from '../models/shoppingCartItems';
import { CartItem } from '../models/cartItem';
import { Apis } from '../config/api-list';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private apis: Apis = new Apis();
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private authService: AuthService) {}

  addItemToCart(email: string, item_: Item, quantity_: number) {
    let cartItem: IShoppingCartItems = {
      id: 0,
      item: item_,
      quantity: quantity_
    };
    if (this.authService.isUserLoggedIn()) {
      this.http.post<IResponce<IShoppingCartReq>>(this.apis.addItemsToCart + `/${email}`, cartItem).subscribe(
        ()=>{
          this.updateCartItemsCount(email)
        }
      );
      
    } else
      this.router.navigate(['/login']);
  }

  updateCartItemsCount(email: string) {
    if (this.authService.isUserLoggedIn()) {
      let count = 0;
      this.http.get<IResponce<number>>(this.apis.getItemsCount + `/${email}`)
        .pipe(
          map(responce =>responce.data)
        ).subscribe(
          res =>{
            this.cartItemCountSubject.next(res);
          });
    }
  }

  removeItemFromCart(email: string, cartItemId: number) {
    if (this.authService.isUserLoggedIn()) {
      return this.http.delete<IResponce<String>>(
        this.apis.deleteItemsFromCart + `/${email}/${cartItemId}`,{observe: 'response'}).pipe(
          map(resp=> {
              if (resp.status === 200){
                this.updateCartItemsCount(email);
                return resp.body;
              }
              else
                catchError(this.errorHandler.handleError)
      }))
    }
  }

  getListOfCartItems(email: String): Observable<CartItem[]> {
    if (this.authService.isUserLoggedIn()) {
      let responce = this.http.get<IResponce<IShoppingCart>>(this.apis.getCartItems + `/${email}`).
        pipe(map(x => x.data));
      let x$ = responce.pipe(
        map(responce => {
          console.log(responce);
          return responce.cartItems as CartItem[]
        }),
        catchError(this.errorHandler.handleError)
      );
      return x$;
    }
  }
}