import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/create-inventory`,
      data
    );
  }

  getAll(page: number, limit: number): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all-inventory/${page}/${limit}`);
  }

  getAllFiltered(page: number, limit: number, data: any): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-all-inventory-filtered/${page}/${limit}?filter=${encodeURIComponent(JSON.stringify(data.filterData))}&sort=${encodeURIComponent(JSON.stringify(data.sortData))}&search=${encodeURIComponent(JSON.stringify(data.searchData))}`)
  }

  getAllByKeyPartners(keyId: any): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-all-inventory-byKey/${keyId}`
    );
  }

  update(data: any, id: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-inventory/${id}`,
      data
    );
  }

  updateManyStatus(data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-many-status`,
      data
    );
  }

  updateManyMoving(data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-many-moving`,
      data
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(
      `${environment.apiV1}/api/v1/delete/delete-inventory/${id}`
    );
  }

  deleteSelected(ids: string[]): Observable<any> {
    return this.http.delete(`${environment.apiV1}/api/v1/delete/items/selected?ids=${JSON.stringify(ids)}`)
  }

  exportAll(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(`${environment.apiV1}/api/v1/get/inventory/form/all/${token.sub}`);
  }

  exportSelected(ids: string[]): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.put(`${environment.apiV1}/api/v1/put/inventory/form/selected`, { id: token.sub, items: ids })
  }

  exportByKeyPartner(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/inventory/form/${token.sub}`
    );
  }
}
