import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient
  ) { }

  getContract(type: string): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.get(`${environment.apiV1}/api/v1/get/contract/${type}/${token.sub}`)
  }

  markAsSeen(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/contract/set-seen/${id}`, {})
  }
}
