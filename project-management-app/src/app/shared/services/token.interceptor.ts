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
    //const token = localStorage.getItem('userToken');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWVmOGIwOC1jZWI0LTRmYWItOTY4MC05MzMwMGEyNTY2Y2IiLCJsb2dpbiI6IndsYWQxIiwiaWF0IjoxNjUyNDI4NDkxfQ.vaEjsHrGvrcWUFuiXhp3NFSNco8xweug9I1kBYqr3hU'
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
