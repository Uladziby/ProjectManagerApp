import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of, pipe, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IUser, IUserInfo, IUserSignIn } from '../interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  public userList$ = new Subject<IUser[]>();
  public user$ = new Subject<IUser>();

  getUsers(): Observable<IUser[]> {
    const req = `${BASIC_URL}/users`;

    return this.http.get<IUser[]>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of([]);
      })
    );
  }

  getUser(id: string): Observable<IUser> {
    const req = `${BASIC_URL}/users${id}`;
    const defaultUser = { id: '', name: '', login: '' };

    return this.http.get<IUser>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultUser);
      })
    );
  }

  deleteUser(id: string) {
    const req = `${BASIC_URL}/users${id}`;

    return this.http.delete(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(error.code);
      })
    );
  }

  changeUser(id: string, info: IUserInfo): Observable<IUser> {
    const req = `${BASIC_URL}/users${id}`;
    const defaultUser = { id: '', name: '', login: '' };

    return this.http.put<IUser>(req, info).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultUser);
      })
    );
  }

  signIn(info: IUserSignIn): Observable<IUserSignIn> {
    const req = `${BASIC_URL}/signin`;
    const defaultUser = { login: '', password: '' };

    return this.http.post<IUserSignIn>(req, info).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultUser);
      })
    );
  }

  signUp(info: IUserInfo): Observable<IUserInfo> {
    const req = `${BASIC_URL}/signup`;
    const defaultUser = { name: '', login: '', password: '' };

    return this.http.post<IUserInfo>(req, info).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultUser);
      })
    );
  }
}
