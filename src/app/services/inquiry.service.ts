import jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  public createInquiry(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/create-inquiry`, data)
  }

  public getInquiries(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem("ACCESS") as any)
    return this.http.get(`${environment.apiV1}/api/v1/get/inquiries/${token.sub}`)
  }

  public getAllInquiries(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/inquiries/all`)
  }

}
