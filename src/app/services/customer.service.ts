import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/create-customer`,
      data
    );
  }

  getAllByKeyPartner(keyPartnerId: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-customer/${keyPartnerId}`
    );
  }

  getOne(id: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-customer/${id}`);
  }

  update(data: any, id: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-customer/${id}`,
      data
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(
      `${environment.apiV1}/api/v1/delete/delete-customer/${id}`
    );
  }
}
