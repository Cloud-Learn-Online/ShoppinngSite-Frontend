import { Component, OnChanges, OnInit } from '@angular/core';

import {Item} from "../models/item";
import { ItemListService } from '../service/item-list.service';
import { throwError, Observable,BehaviorSubject } from 'rxjs';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{
  
  items$: Observable<Item[]>;
  filteredItems$: Observable<Item[]>;

  constructor(private itemListService: ItemListService, 
    private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(){
    this.items$= this.itemListService.item$;
    this.filteredItems$=this.items$;
  }

  performFilter(value:string){
    console.log(value);
    value=value.toLocaleLowerCase();
    this.filteredItems$=this.items$.pipe(
      map(items=>items.filter(item=> item.item_name.toLocaleLowerCase().indexOf(value)!=-1))
    );
  }
  
  addItemToCart(item:Item,_event){
    console.log(item);
    this.shoppingCartService.addItemToCart(item,1); 
  }
}
