import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { ITask, ITaskCreate, ITaskNewInfo } from '../interfaces/interfaces';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks(boardId: string, columnId: string): Observable<ITask[]> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<ITask[]>(req).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<ITask> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.get<ITask>(req);
  }

  createTask(
    boardId: string,
    columnId: string,
    body: ITaskCreate
  ): Observable<ITask> {
    console.log(body);
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<ITask>(req, body);
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.delete(req);
  }

  changeTask(body: ITaskNewInfo, taskId: string): Observable<ITask> {
    const req = `${BASIC_URL}/boards/${body.boardId}/columns/${body.columnId}/tasks/${taskId}`;
    return this.http.put<ITask>(req, body);
  }

  updateColumnID(
    body: ITaskNewInfo,
    taskId: string,
    columnId: string
  ): Observable<ITask> {
    const req = `${BASIC_URL}/boards/${body.boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.put<ITask>(req, body);
  }
}
