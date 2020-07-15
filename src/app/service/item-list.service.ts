import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { tap, catchError, map, filter, flatMap } from "rxjs/operators";
import { Item } from '../models/item';
import { IResponce } from '../models/responce';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private itemUrl = "http://localhost:6060/shoppingSite/shoppingSite/Items/list";

  private items:Item[]=[]; 
  
  private responce$ =this.http.get<IResponce<Item[]>>(this.itemUrl);
  item$= this.responce$.pipe(
            map(x=>x.data),
            catchError(this.handleError));

  constructor(private http: HttpClient) {
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
