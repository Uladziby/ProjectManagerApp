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
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NjExNmM3YS00YTJkLTQyMmMtOTc1Yi05NGMyNTAzN2E4YWUiLCJsb2dpbiI6IndsYWQxIiwiaWF0IjoxNjUxOTI1ODE3fQ.2H4HMV56hIIL4Z6nZKA7ZPrphEfdwONKkYqka8Sq6jA'
     if (token) {
       req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
       });
     }
   

    return next.handle(req);
  }
}

export const TOKEN_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: tokenInterceptor,
  multi: true,
};
