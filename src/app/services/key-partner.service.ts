import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyPartnerService {

  constructor(private http: HttpClient) { }

  getKeyPartnerForApproval(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/key-partners/for-approval`)
  }

  approveKeyPartner(id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/key-partner/approve/${id}`, {})
  }

  getApprovedKeyPartners(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/key-partners/approved`)
  }

  setStatus(stat: boolean, id: string): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/key-partner/status/set/${id}`, { status: !stat })
  }

}
