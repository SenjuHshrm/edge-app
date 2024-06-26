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

  rejectKeyPartner(id: string, email: string): Observable<any> {
    return this.http.delete(`${environment.apiV1}/api/v1/delete/acct-request/reject/${id}/${email}`)
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

  setKeyPartnerPassword(id: string, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/key-partner/set-password/${id}`,
      data
    );
  }

  getActivatedKeyPartners(): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/key-partners/activated`
    );
  }

  setUserId(id: string, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/key-partner/set-user-id/${id}`,
      data
    );
  }

  getOneKeyPartner(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/get-keypartner/${id}`
    );
  }

  getContractSendingHistory(type: string): Observable<any> {
    return this.http.get(
      `${environment.apiV1}/api/v1/get/key-partners/contract/${type}`
    );
  }

  saveContract(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/key-partners/save-contract`,
      data,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  assignCodeAndPassword(id: any, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/assign-codePassword/${id}`,
      data
    );
  }

  deleteKeypartner(id: string): Observable<any> {
    return this.http.delete(
      `${environment.apiV1}/api/v1/delete/delete-kp/${id}`
    );
  }
}
