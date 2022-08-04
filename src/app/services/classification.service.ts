import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/create-classification`,
      data
    );
  }

  getAll(): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-classification`
    );
  }

  getOne(id: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-classification/${id}`
    );
  }

  getByType(type: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-classification/${type}`
    );
  }

  update(data: any, id: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-classification/${id}`,
      data
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(
      `${environment.apiV1}/api/v1/delete/delete-classification/${id}`
    );
  }
}
