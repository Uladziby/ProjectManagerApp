import { ITaskCreate } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IColumn, IColumnCreation, IColumns, ITask } from '../interfaces/interfaces';

@Injectable()
export class CardService {
  constructor(private http: HttpClient) {}

  getCards(boardId: string): Observable<IColumns[]> {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;
    return this.http.get<IColumns[]>(req).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getCard(boardId: string, columnId: string): Observable<IColumn> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    return this.http.get<IColumn>(req);
  }

  createColumn(boardId: string, body: IColumnCreation) {
    const req = `${BASIC_URL}/boards/${boardId}/columns`;
    return this.http.post<IColumn>(req, body);
  }

  deleteColumn(boardId: string, columnId: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    console.log(req)
    return this.http.delete(req);
  }

  changeBoard(
    boardId: string,
    columnId: string,
    body: IColumnCreation
  ): Observable<IColumns> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    return this.http.put<IColumns>(req, body);
  }

  createTask(boardId: string, columnId: string, body: ITaskCreate) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<ITask>(req, body);
  }
}
