import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/create-bundle`,
      data
    );
  }

  getAllByKeyPartners(keyId: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-bundles-byKey/${keyId}`
    );
  }

  getBundle(id: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-bundle/${id}`
    );
  }

  update(data: any, id: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-bundle/${id}`,
      data
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(
      `${environment.apiV1}/api/v1/delete/delete-bundle/${id}`
    );
  }
}