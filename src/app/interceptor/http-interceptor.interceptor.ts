import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access: string | null = localStorage.getItem('ACCESS')
    if(access) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${access}`
        }
      })
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    }
    return next.handle(req)
      .pipe(
        map((e: HttpEvent<any>): any => {
          if(e instanceof HttpResponse) {
            if(access) {
              if(typeof e.body.info === 'string') {
                localStorage.setItem('ACCESS', e.body.info)
              }
            }
            return e;
          } else if(e instanceof HttpErrorResponse) {
            return throwError(() => e)
          }
        }))
  }
}
