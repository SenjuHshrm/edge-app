import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/login`, data);
  }

  logout(): Observable<any> {
    return this.http.delete(`${environment.apiV1}/api/v1/delete/logout`);
  }

  requestNewToken(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/refresh/access`);
  }

  getKeyPartners(): Observable<any> {
    return this.http.get(`${environment.apiV1}/api/v1/get/get-key-partners`);
  }

  registerKeyPartner(data: any): Observable<any> {
    return this.http.post(`${environment.apiV1}/api/v1/post/register`, data);
  }

  uploadTemp(data: any): Observable<any> {
    return this.http.put(`${environment.apiV1}/api/v1/put/addr-temp`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(
      `${environment.apiV1}/api/v1/put/change-password`,
      data
    );
  }

  updateProfile(data: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-profile/${token.sub}`,
      data
    );
  }

  updateProfileImage(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiV1}/api/v1/post/profile/upload`,
      data,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  updateUsername(data: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.put(
      `${environment.apiV1}/api/v1/put/update-username/${token.sub}`,
      data
    );
  }

  getNotificationCounts(): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.get(
      `${environment.apiV1}/api/v1/get/notif-count/${token.sub}`
    );
  }

  updateNotifStatus(data: any): Observable<any> {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    return this.http.put(
      `${environment.apiV1}/api/v1/put/toggle-notification/${token.sub}`,
      data
    );
  }
}
