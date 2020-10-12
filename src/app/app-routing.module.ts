import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth.guard';
import { OrderComponent } from './order/order.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {path:'home' ,component:HomeComponent},
  {path:'products', component:ItemListComponent},
  {path:':email/products', component:ItemListComponent},
  {path:'products/:id' , component:ItemDetailComponent},
  {path:':email/products/:id' , component:ItemDetailComponent},
  {path:':email/cart' , canActivate: [AuthGuard], component:ShoppingCartComponent},
  {path:':email/orders' , canActivate: [AuthGuard], component:OrderComponent},
  {path:':email/profile' , canActivate: [AuthGuard], component:UserDetailsComponent},
  {path:'admin/manageItems' , component:ItemComponent},
  {path:'login' , component:LoginComponent},
  {path:'sign-up' , component:RegisterComponent},
  {path:'', redirectTo:'home' ,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
