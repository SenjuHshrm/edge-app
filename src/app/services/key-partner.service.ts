import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeyPartnerService {
  constructor(private http: HttpClient) {}

  getKeyPartnerForApproval(): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/key-partners/for-approval`
    );
  }

  approveKeyPartner(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/key-partner/approve/${id}`,
      {}
    );
  }

  getApprovedKeyPartners(): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/key-partners/approved`
    );
  }

  setStatus(stat: boolean, id: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/key-partner/status/set/${id}`,
      { status: !stat }
    );
  }

  setKeyPartnerPassword(id: string, password: string): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/key-partner/set-password/${id}`,
      { password }
    );
  }

  getActivatedKeyPartners(): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/key-partners/activated`
    );
  }

  setUserId(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/key-partner/set-user-id/${id}`, data)
  }

  getOneKeyPartner(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-keypartner/${id}`
    );
  }

  getContractSendingHistory(type: string): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/key-partners/contract/${type}`)
  }

  saveContract(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/key-partners/save-contract`, data)
  }
}
