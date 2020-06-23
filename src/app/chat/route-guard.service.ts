import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('Guard route called');
    let token = Cookie.get('authToken');
    if (token == null || token == undefined || token == '') {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
