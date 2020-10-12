import { Component, OnChanges, OnInit } from '@angular/core';

import {Item} from "../models/item";
import { ItemListService } from '../service/item-list.service';
import { Observable} from 'rxjs';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{
  
  items$: Observable<Item[]>;
  filteredItems$: Observable<Item[]>;
  email = this.sessionService.user == undefined ? "" : this.sessionService.user.email;

  constructor(private itemListService: ItemListService, 
              private shoppingCartService: ShoppingCartService,
              private route:ActivatedRoute,
              private sessionService: SessionService) {}

  ngOnInit(){
    this.items$= this.itemListService.item$;
    this.filteredItems$=this.items$;
  }

  performFilter(value:string){
    console.log(value);
    value=value.toLocaleLowerCase();
    this.filteredItems$=this.items$.pipe(
      map(items=>items.filter(item=> item.itemName.toLocaleLowerCase().indexOf(value)!=-1))
    );
  }
  
  addItemToCart(item:Item,_event){
    console.log(item);
    this.shoppingCartService.addItemToCart(this.email, item, 1); 
  }
}
