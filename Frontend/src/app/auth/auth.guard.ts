import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
	isLog=this.authService.isLoggedIn;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLog !== true) {
      //window.alert("Access not allowed!");
      this.router.navigate(['login'])
    }
    return true;
  }
}