import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';

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
    RegisterComponent,
    OrderComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
