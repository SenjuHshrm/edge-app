import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  public checkAddress(params: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/check-address/${params.province}/${params.city}/${params.brgy}/${params.type}`
    );
  }

  public getIndividualItemByKeyPartner(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-inventory-byKey/${token.sub}`
    );
  }

  public getBundledItemByKeyPartner(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-bundles-byKey/${token.sub}`
    );
  }

  public addBooking(data: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.post(`${environment.apiV1}/api/v1/post/booking/add`, {
      ...data,
      keyPartnerId: token.sub,
    });
  }

  public getAllBookingByKP(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all/booking/${token.sub}`
    );
  }

  public getAllBooking(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all/booking`);
  }

  public getCurrentMonthBookingCount(param: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/monthly-booking/${param.start}/${param.end}`)
  }

  public getCurrentMonthBookingCountByKeyPartner(param: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/monthly-booking/${param.start}/${param.end}/${param.id}`)
  }

  public markAsFulfilled(booking: any): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/mark-as-fulfilled`, booking)
  }

  public exportSelected(booking: any): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/export/all`, booking)
  }

  public markOneAsFulfilled(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/mark-one/fulfilled/${id}`, {})
  }

  public markOneAsUnfulfilled(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/mark-one/unfulfilled/${id}`, {})
  }

  public exportOne(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/export-one/${id}`, {})
  }
}
