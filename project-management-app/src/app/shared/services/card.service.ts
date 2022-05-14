import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IColumn, IColumnCreation, IColumns } from '../interfaces/interfaces';

@Injectable()
export class CardService {
  constructor(private http: HttpClient) {}

  getColumns(boardId: string): Observable<IColumns[]> {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;
    return this.http.get<IColumns[]>(req).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getColumn(boardId: string, columnId: string): Observable<IColumn> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    return this.http.get<IColumn>(req);
  }

  createColumn(boardId: string, body: IColumnCreation) {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;
    return this.http.post<IColumns>(req, body);
  }

  deleteColumn(boardId: string, columnId: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    return this.http.delete(req);
  }

  changeColumn(
    boardId: string,
    columnId: string,
    body: IColumnCreation
  ): Observable<IColumns> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    return this.http.put<IColumns>(req, body);
  }
}
