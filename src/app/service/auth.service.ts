import { Injectable } from '@angular/core';
import {Apis} from '../config/api-list'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apis:Apis = new Apis();
 
  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user) {
  return this.http.post<any>(this.apis.register, user)
  }

  loginUser(user) {
  return this.http.post<any>(this.apis.login, user)
  }

  logoutUser() {
  localStorage.clear();
  sessionStorage.clear();
  this._router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token:string){
    localStorage.setItem('token',token);  
  }

  isUserLoggedIn() {
    return (!!localStorage.getItem('token') && !!sessionStorage.getItem('user'))
  }
}
