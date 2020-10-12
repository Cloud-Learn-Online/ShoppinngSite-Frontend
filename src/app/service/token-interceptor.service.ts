import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor } from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    let token = authService.getToken();
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + (token === null ? '': token))
      }
    )
    return next.handle(tokenizedReq)
  }
}
