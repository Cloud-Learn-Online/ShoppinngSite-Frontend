import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    ShoppingCartComponent,
    HomeComponent,
    TopBarComponent,
    JwPaginationComponent,
    LoginComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home' ,component:HomeComponent},
      {path:'products' , component:ItemListComponent},
      {path:'products/:id' , component:ItemDetailComponent},
      {path:'cart' , component:ShoppingCartComponent},
      {path:'admin/manageItems' , component:ItemComponent},
      {path:'login' , component:LoginComponent},
      {path:'', redirectTo:'home' ,pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
