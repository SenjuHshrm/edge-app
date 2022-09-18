import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';

describe('HttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptorInterceptor
      ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorInterceptor = TestBed.inject(HttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
