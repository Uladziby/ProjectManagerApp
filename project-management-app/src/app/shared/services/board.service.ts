import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { IBoard, IBoardCreation, IBoards } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoards[]> {
    const req = `${BASIC_URL}/boards`;
    return this.http.get<IBoards[]>(req).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getBoard(id: string): Observable<IBoard> {
    const req = `${BASIC_URL}/boards/${id}`;
    return this.http.get<IBoard>(req);
  }

  createBoard(title: string) {
    const req = `${BASIC_URL}/boards`;
    const body: IBoardCreation = { title: title };
    return this.http.post<IBoards>(req, body);
  }

  deleteBoard(id: string) {
    const req = `${BASIC_URL}/boards/${id}`;
    console.log('service deleting', id);
    return this.http.delete(req);
  }
  // deleteBoard(id: string) {
  //   const req = `${BASIC_URL}/boards/${id}`;
  //   console.log('service deleting', id);
  //   return this.http.delete(req).subscribe(() => {});
  // }

  changeBoard(id: string, title: string): Observable<IBoards> {
    const req = `${BASIC_URL}/users${id}`;
    const body: IBoardCreation = { title: title };
    return this.http.put<IBoards>(req, body);
  }
}
