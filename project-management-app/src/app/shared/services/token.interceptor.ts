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
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZDdhMTBiOS01NTc4LTQ5Y2MtYWY5MC0yYWJkZjVlMzc3MmQiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE1Nzk5NzZ9.mtUVf2QeFPTG06gOa97A0JoUJSIItGATho2gE8t7Fwg`,
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
