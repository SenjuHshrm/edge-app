import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token: string | null = localStorage.getItem('ACCESS')
    if(token) {
      let access: number = (jwtDecode(token) as any).access;
      switch(access) {
        case 0:
          window.location.href = '/su/home'
          break
        case 1:
          window.location.href = '/admin/home'
          break
        case 2:
          window.location.href = '/admin/home'
          break
        case 3:
          window.location.href = '/key-partners/home'
          break
      }
      return false
    }
    return true
  }
  
}