import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllQuotations(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/quotations/all`)
  }

  public getQuotationByKeyPartnerId(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.get(`${environment.apiV1}/api/v1/get/quotations/${token.sub}`)
  }

  public markAsPending(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/set-pending/${id}`, { status: "pending" })
  }

  public createQuotation(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/create-quotation`, data)
  }

  public generateQuoteFile(id: string): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/quotation/form/${id}`)
  }

}
