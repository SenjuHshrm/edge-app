import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  private requestAccess: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private specUrls: string[];

  constructor(private user: UserService) {
    this.specUrls = [
      `${environment.apiV1}/api/v1/put/addr-temp`,
      `${environment.apiV1}/api/v1/post/key-partners/save-contract`,
      `${environment.apiV1}/api/v1/post/profile/upload`,
    ];
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = this.addAuthToken(req);
    return next.handle(authReq).pipe(
      catchError((e: HttpErrorResponse): Observable<any> => {
        if (
          req.url !== `${environment.apiV1}/api/v1/post/login` &&
          req.url !== `${environment.apiV1}/api/v1/post/register` &&
          req.url !== `${environment.apiV1}/api/v1/post/profile/upload`
        ) {
          if (e instanceof HttpErrorResponse && e && e.status === 401) {
            return this.handleUnauthorized(authReq, next);
          }
        }
        return throwError(() => e);
      })
    );
  }

  private handleUnauthorized(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.requestAccess) {
      this.requestAccess = true;
      this.refreshTokenSubject.next(null);
      return this.user.requestNewToken().pipe(
        switchMap((res) => {
          this.requestAccess = false;
          localStorage.setItem('ACCESS', res.token);
          this.refreshTokenSubject.next(res.token);
          return next.handle(this.addAuthToken(req));
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addAuthToken(req)))
    );
  }

  private addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    if (this.specUrls.indexOf(req.url) === -1) {
      if (!req.headers.has('Content-Type')) {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
      }
    }
    let access: string | null = localStorage.getItem('ACCESS');
    if (!access) {
      return req;
    }
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${access}`,
      },
    });
  }
}
