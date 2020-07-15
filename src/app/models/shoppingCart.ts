import { ShoppingCartItems } from './shoppingCartItems';

export interface ShoppingCart{
    
    id : number;
    cart_items: ShoppingCartItems[];
}