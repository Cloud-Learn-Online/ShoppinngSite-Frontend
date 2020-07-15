import { Component, OnInit,Input } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  noOfCartItems :number =0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartService.cartItemObserv$.subscribe(count=> this.noOfCartItems=count);
  }
}
