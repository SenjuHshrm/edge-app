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

  public checkAddress(type: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/check-address/${type}`
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

  public getAllBookingByKP(page: number, limit: number): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all/booking/${token.sub}/${page}/${limit}`
    );
  }

  public getAllBookingPerPage(page: number, limit: number): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all/booking/${page}/${limit}`);
  }

  public getAllBooking(data?: { field: string, value: string }): Observable<any> {
    let url = (data === undefined) ? `${environment.apiV1}/api/v1/get/get-all/booking` : `${environment.apiV1}/api/v1/get/get-all/booking?key=${data!.field}&value=${data!.value}`;
    return this.http.get(url)
  }

  public getAllBookingFiltered(page: number, limit: number, filter: any, search: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all/booking-filtered/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filter))}&search=${encodeURIComponent(JSON.stringify(search))}`)
  }

  public getAllBookingByKPFiltered(page: number, limit: number, filter: any, search: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all/booking-filtered/${token.sub}/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(filter))}&search=${encodeURIComponent(JSON.stringify(search))}`)
  }

  public getOneBooking(bookingId: string): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/booking/${bookingId}`
    );
  }

  public getCurrentMonthBookingCount(param: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/monthly-booking/${param.start}/${param.end}`
    );
  }

  public getCurrentMonthBookingCountByKeyPartner(param: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/monthly-booking/${param.start}/${param.end}/${param.id}`
    );
  }

  public markAsFulfilled(booking: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/mark-as-fulfilled`,
      booking
    );
  }

  public exportSelected(booking: any): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/export/all`, booking);
  }

  public markOneAsFulfilled(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/mark-one/fulfilled/${id}`,
      {}
    );
  }

  public markOneAsUnfulfilled(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/mark-one/unfulfilled/${id}`,
      {}
    );
  }

  public exportOne(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/export-one/${id}`,
      {}
    );
  }

  public returnBooking(id: string, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/return/booking/${id}`,
      data
    );
  }

  public uploadBooking(formData: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/booking/upload-custom`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  public removeBooking(id: string): Observable<any> {
    return this.http.delete(`${environment.apiV1}/api/v1/delete/booking/remove/${id}`)
  }
}
