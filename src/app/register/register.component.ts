import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser} from './registerUser';
import { AuthService } from '../service/auth.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerUser = new RegisterUser();
  cpassword:string;
  errorMessage:string;
  color:string;
  count = 0;

  constructor(private route:Router,
              private authService: AuthService) { }

  navigate(){
    this.route.navigate(['login']);
  }

  signUpUser(){
    if(this.verify()){
      this.authService.registerUser(this.registerUser).subscribe(
        ()=>{
          this.errorMessage = 'Registeration Successfull';
          this.color = 'text-success';

           let interval = setInterval(()=>{
            this.errorMessage = this.intervalMessage();
            },1500)

          setTimeout(
            ()=>{
            clearInterval(interval);
            this.count = 0;
            this.route.navigate(['login'])},4000);
        }
      )
    }
    else{
      this.color = 'text-danger';
      this.errorMessage = `Validation Error Please fill all the fields`;
    }
  }

  verify(){
    return this.registerUser.name !== undefined
          && this.registerUser.email !== undefined
          && this.registerUser.password !== undefined
          && this.cpassword !== undefined
          && this.registerUser.password === this.cpassword;
  }

  intervalMessage(){
    this.count = Number(this.count)+1;
    return `Redirecting in ${this.count} seconds`;
  }
}
