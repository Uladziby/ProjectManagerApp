import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BASIC_URL } from './url';
import {
  IUser,
  IUserInfo,
  IUserSignIn,
  IUserToken,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  constructor(private http: HttpClient) { }


  getUsers(): Observable<IUser[]> {
    const req = `${BASIC_URL}/users`;
    return this.http.get<IUser[]>(req).pipe(catchError(() => of([])));
  }

  getUser(id: string): Observable<IUser> {
    const req = `${BASIC_URL}/users/${id}`;
    return this.http.get<IUser>(req);
  }

  deleteUser(id: string) {
    const req = `${BASIC_URL}/users/${id}`;
    return this.http.delete(req);
  }

  changeUser(id: string, info: IUserInfo): Observable<IUser> {
    const req = `${BASIC_URL}/users${id}`;
    return this.http.put<IUser>(req, info);
  }

  signIn(info: IUserSignIn): Observable<IUserToken> {
    const req = `${BASIC_URL}/signin`;
    return this.http.post<IUserToken>(req, info)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('userToken', token);
            this.setToken(token);
          }
        )
      );
  }

  signUp(info: IUserInfo): Observable<IUserInfo> {
    const req = `${BASIC_URL}/signup`;
    return this.http.post<IUserInfo>(req, info);
  }

  setToken(token: string|null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuth(): boolean {
    return !!this.token;
  }
  logout(){
    this.setToken(null);
    localStorage.removeItem('userToken');
  }
}
