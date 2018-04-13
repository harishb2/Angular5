import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';



@Injectable()
export class AuthGuardService  {
  constructor(   
    public router: Router) { }
    canActivate(): boolean {
      if (!localStorage.getItem("user")) {
        this.router.navigate(['/login']);
          return false;
        }
      return true;
    }
}
