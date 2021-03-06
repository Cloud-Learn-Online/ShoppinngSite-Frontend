import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Item } from '../../models/item';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ItemListService } from '../../service/item-list.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  id:Number = (Number)(this.route.snapshot.paramMap.get('id'));
  email:string = this.sessionService.user == undefined ? "" : this.sessionService.user.email;
  item:Item;
  ordered_Quantity:number=1;
  decrease_Quantity:String="disabled";
  increase_Quantity:String="";

  constructor(private itemListService: ItemListService,
              private route:ActivatedRoute,
              private router:Router,
              private shoppingCartService:ShoppingCartService,
              private authService:AuthService,
              private sessionService:SessionService) {}

  ngOnInit() {
    this.itemListService.item$.pipe(
      map(items=>items.find(item=> item.id===this.id))
    ).subscribe(x=> this.item=x);
  }


  navigateBack(){
    this.router.navigate([`${this.email}/products`]);
  }

  decreaseQuantity(){
    this.ordered_Quantity--;
    if(this.ordered_Quantity==0){
      this.decrease_Quantity='disabled';
      this.increase_Quantity='';
    }
    else{
      this.decrease_Quantity='';
      this.increase_Quantity='';
    }
  }

  increaseQuantity(){
    this.ordered_Quantity++;
    if(this.ordered_Quantity==this.item.quantity){
      this.decrease_Quantity='';
      this.increase_Quantity='disabled';
    }
    else{
      this.decrease_Quantity='';
      this.increase_Quantity='';
    }
  }

  addToCart(item:Item){
    if(this.ordered_Quantity==0)
      this.ordered_Quantity++;
    this.shoppingCartService.addItemToCart(this.email,item, this.ordered_Quantity);
  }

}
