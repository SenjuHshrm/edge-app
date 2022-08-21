import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(
    private http: HttpClient
  ) { }

  createPurchaseOrder(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/create-purchase-order`, data)
  }
}
