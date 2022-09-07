import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

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

  getAllPurchaseOrder(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/purchase-order/all`)
  }

  generatePOFile(poId: string): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/purchase-order/form/${poId}`)
  }

  generateMultiplePO(ids: string[]): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    return this.http.put(`${environment.apiV1}/api/v1/put/purchase-order/form/selected`, { ids: ids, id: token.sub })
  }
}
