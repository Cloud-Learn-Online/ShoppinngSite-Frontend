export interface Item{
    id:number;
    item_name:string;
    item_price:number;
    description:string;
    ratings:number;
    quantity ?:number;
    stockout:boolean;
}