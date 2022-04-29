import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IColumn, IColumnCreation, IColumns } from '../interfaces/interfaces';

@Injectable()
export class CardService {
  constructor(private http: HttpClient) {}

  getCards(boardId: string): Observable<IColumns[]> {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;

    return this.http.get<IColumns[]>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of([]);
      })
    );
  }

  getCard(boardId: string, columnId: string): Observable<IColumn> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    const defaultColumn: IColumn = { id: '', title: '', order: 0, tasks: [] };

    return this.http.get<IColumn>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultColumn);
      })
    );
  }

  createCard(boardId: string, order: number, title: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;
    const body: IColumnCreation = { title: title, order: order };
    const defaultBoard: IColumns = { id: '', title: '', order: 0 };

    return this.http.post<IColumns>(req, body).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultBoard);
      })
    );
  }

  deleteBoard(boardId: string, columnId: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;

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

  changeBoard(
    boardId: string,
    columnId: string,
    order: number,
    title: string
  ): Observable<IColumns> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    const body: IColumnCreation = { title: title, order: order };
    const defaultAnswer: IColumns = { id: '', title: '', order: 0 };

    return this.http.put<IColumns>(req, body).pipe(
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
