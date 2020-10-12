import { IShoppingCartItems } from './shoppingCartItems';

export interface IShoppingCartReq{
    
    id : number;
    cart_items: IShoppingCartItems[];
}