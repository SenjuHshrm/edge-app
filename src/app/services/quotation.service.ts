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

  public setStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/set-status/${id}`, { status: status })
  }

  public getForRequote(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/quotations/declined`)
  }

  public createQuotation(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/create-quotation`, data)
  }

  public generateQuoteFile(id: string): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/quotation/form/${id}`)
  }

  public generateMultipleQuote(ids: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.put(`${environment.apiV1}/api/v1/put/quotation/form/selected`, { ids: ids, id: token.sub })
  }

}
