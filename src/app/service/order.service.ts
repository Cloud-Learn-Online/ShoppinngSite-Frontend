import { Injectable } from '@angular/core';
import { Apis } from '../config/api-list';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apis:Apis = new Apis();
  constructor() { }
}
