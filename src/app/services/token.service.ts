import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getAccessToken(): string {
    let token =  localStorage.getItem('ACCESS') || null
    return (token === null) ? '' : token
  }

  public getAccessTokenDecoded(): any {
    let token =  localStorage.getItem('ACCESS') || null
    if(token !== null) {
      return jwtDecode(token)
    }
    return {}
  }

  public reqAccessToken(): Observable<any> {
    return new Observable
  }

}
