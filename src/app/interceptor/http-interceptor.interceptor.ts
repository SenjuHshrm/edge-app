import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private user: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      })
    }
    req = this.addAuthToken(req)
    return next.handle(req)
      .pipe(
        // map((e: HttpEvent<any>): any => {
        //   return e;
        // }),
        catchError((e: HttpErrorResponse): Observable<any> => {
          if(e && e.status === 401) {
            this.user.requestNewToken().subscribe({
              next: (res: any) => {
                localStorage.setItem('ACCESS', res.token)
                return next.handle(req)
              }
            })
          }
          return throwError(() => e)
        })
      )
  }

  private addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    let access: string | null = localStorage.getItem('ACCESS')
    if(!access) {
      return req
    }
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${access}`
      }
    })
  }
}