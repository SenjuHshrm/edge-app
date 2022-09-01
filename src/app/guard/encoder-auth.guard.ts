import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncoderAuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    if(token.access === 1) {
      return true;
    }
    window.location.href = '/error/403'
    return false;
  }
  
}
