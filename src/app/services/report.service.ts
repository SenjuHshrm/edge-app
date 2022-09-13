import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getMonthlyQuotations(params: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/monthly-quotation/${params.start}/${params.end}`)
  }

  getMonthlyPO(params: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/monthly-po/${params.start}/${params.end}`)
  }
}
