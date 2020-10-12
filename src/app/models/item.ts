export interface Item{
    id:number;
    itemName:string;
    itemPrice:number;
    description:string;
    ratings:number;
    quantity ?:number;
    stockout:boolean;
}