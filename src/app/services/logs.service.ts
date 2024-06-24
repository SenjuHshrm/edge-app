import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(
    private _http: HttpClient
  ) { }

  public getLogsByDate(date: string): Observable<any> {
    return this._http.get(`${environment.apiV1}/api/v1/get/logs/${date}`)
  }
}
