import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  constructor(
    private http: HttpClient
  ) { }

  public getClientList(client?: string): Observable<any> {
    let url = client ? `${environment.apiV1}/api/v1/get/api-key/clients?filter=${encodeURIComponent(JSON.stringify({ client }))}` :
    `${environment.apiV1}/api/v1/get/api-key/clients`
    return this.http.get(url)
  }

  public addClient(client: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/api-key/add-client`, client)
  }

  public generateAPIKey(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/api-key/generate/${id}`, {})
  }

  public deleteClient(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiV1}/api/v1/delete/api-key/remove/${id}`)
  }
}
