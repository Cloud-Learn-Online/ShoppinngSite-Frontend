import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { tap, catchError, map, filter, flatMap } from "rxjs/operators";
import { Item } from '../models/item';
import { IResponce } from '../models/responce';
import { of } from "rxjs";
import { Apis } from '../config/api-list';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private apis:Apis = new Apis();
  private items:Item[]=[]; 
  
  private responce$ =this.http.get<IResponce<Item[]>>(this.apis.getItems);
  item$= this.responce$.pipe(
            map(x=>x.data),
            catchError(this.errorHandler.handleError));

  constructor(private http: HttpClient, private errorHandler:ErrorHandlerService) {
  }  
}
