import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/login`, data)
  }

  logout(): Observable<any> {
    return this.http.delete(`${environment.apiV1}/api/v1/delete/logout`)
  }

}
