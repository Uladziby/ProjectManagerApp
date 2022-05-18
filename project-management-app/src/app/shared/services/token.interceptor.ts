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
     //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNmQyNGNkYi03MTc3LTRlNTYtODc0Ni1kMzk5OWM4OTcyYzUiLCJsb2dpbiI6ImEzNCIsImlhdCI6MTY1MjcxMzExMH0.M-0ljfyL7lm5E5RoyB3jsgqhSt9scI_1Y_1ilajz4oU'
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
