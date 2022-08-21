import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  public checkAddress(params: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/check-address/${params.province}/${params.city}/${params.brgy}/${params.type}`)
  }

  public getIndividualItemByKeyPartner(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all-inventory-byKey/${token.sub}`)
  }

  public getBundledItemByKeyPartner(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all-bundles-byKey/${token.sub}`)
  }

  public addBooking(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/booking/add`, data)
  }
}
