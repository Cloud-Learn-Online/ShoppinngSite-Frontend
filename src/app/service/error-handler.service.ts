import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router:Router) { }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.status ===403) {
      errorMessage = `An error occured: ${err.error.message}`;
      this.router.navigate(['/login']);
    } else {
      errorMessage = `Server returned code: ${err.status},error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
