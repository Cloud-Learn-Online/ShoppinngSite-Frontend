export class Apis{
    private port = "6060";
    private host = `http://localhost:${this.port}/shoppingsite`;

    private private = `${this.host}/private/`;
    private public = `${this.host}/public/`;
    private admin = `${this.host}/admin/`;
    
    deleteUser = `${this.private}user`;
    updateUser = `${this.private}user`;
    login = `${this.host}/authenticate`;
    register = `${this.public}user/create`;
    
    createItems = `${this.admin}items`;
    deleteItems = `${this.admin}items`;
    updateItems = `${this.admin}items`;
    getItems = `${this.public}items/list`;

    private shoppigcart_api = `${this.private}cart/items`;
    addItemsToCart = this.shoppigcart_api+"/add";
    getItemsCount = this.shoppigcart_api+"/count"; 
    deleteItemsFromCart = this.shoppigcart_api+"/remove";
    getCartItems = this.shoppigcart_api;
    emptyCart = this.shoppigcart_api+"/emptycart";

    private orders_api = `${this.private}order`;
    createOrder = `${this.orders_api}/create`;
    cancelItemsOnOrder = `${this.orders_api}/cancelItem`;
    cancelOrder = `${this.orders_api}/cancelOrder`;
    getOrdersList =`${this.orders_api}/list`;
}