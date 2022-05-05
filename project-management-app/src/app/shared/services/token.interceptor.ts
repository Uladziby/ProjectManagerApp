import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
    // if (token) {
    //   req = req.clone({
    //     headers: req.headers.set('Authorization', `Bearer ${token}`),
    //   });
    // }
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OTQ4NjgzNS01ZWE5LTQzMTMtODY1ZS1jMjY2ZTAyNGIzZWMiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE3NTI2ODl9.MFD5yz393QFkQDsOpZgTc1LP6ZmLd7SYlNxjTPh7NTA`,
      }),
    });

    return next.handle(req);
  }
}

export const TOKEN_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: tokenInterceptor,
  multi: true,
};
