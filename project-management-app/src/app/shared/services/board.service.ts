import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IBoard, IBoardCreation, IBoards } from '../interfaces/interfaces';

@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoards[]> {
    const req = `${BASIC_URL}/boards`;

    return this.http.get<IBoards[]>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of([]);
      })
    );
  }

  getBoard(id: string): Observable<IBoard> {
    const req = `${BASIC_URL}/boards/${id}`;
    const defaultBoard: IBoard = { id: '', title: '', columns: [] };

    return this.http.get<IBoard>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultBoard);
      })
    );
  }

  createBoard(title: string) {
    const req = `${BASIC_URL}/boards`;
    const body: IBoardCreation = { title: title };
    const defaultBoard: IBoards = { id: '', title: '' };

    return this.http.post<IBoards>(req, body).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultBoard);
      })
    );
  }

  deleteBoard(id: string) {
    const req = `${BASIC_URL}/boards/${id}`;

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

  changeBoard(id: string, title: string): Observable<IBoards> {
    const req = `${BASIC_URL}/users${id}`;
    const body: IBoardCreation = { title: title };
    const defaultAnswer: IBoards = { id: '', title: '' };

    return this.http.put<IBoards>(req, body).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultAnswer);
      })
    );
  }
}
