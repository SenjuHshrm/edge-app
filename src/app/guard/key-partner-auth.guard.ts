import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyPartnerAuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token: string | null = localStorage.getItem('ACCESS')
      if(!token) {
        window.location.href = 'key-partners/login'
        return false;
      }
      return true;
  }
  
}
