import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASIC_URL } from './url';
import { ITask, ITaskCreate, ITaskNewInfo } from '../interfaces/interfaces';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(boardId: string, columnId: string): Observable<ITask[]> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks`;

    return this.http.get<ITask[]>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
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
    const defaultTask: ITask = {
      id: '',
      title: '',
      order: 0,
      description: '',
      userId: '',
      boardId: '',
      columnId: '',
    };

    return this.http.get<ITask>(req).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultTask);
      })
    );
  }

  createCard(
    boardId: string,
    columnId: string,
    order: number,
    title: string,
    description: string,
    userId: string
  ): Observable<ITask> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks`;
    const body: ITaskCreate = {
      title: title,
      order: order,
      description: description,
      userId: userId,
    };
    const defaultTask: ITask = {
      id: '',
      title: '',
      order: 0,
      description: '',
      userId: '',
      boardId: '',
      columnId: '',
    };

    return this.http.post<ITask>(req, body).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultTask);
      })
    );
  }

  deleteCard(boardId: string, columnId: string, taskId: string) {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;

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

  changeCard(
    boardId: string,
    columnId: string,
    order: number,
    title: string,
    description: string,
    userId: string
  ): Observable<ITask> {
    const req = `${BASIC_URL}/boards/${boardId}/columns/${columnId}`;
    const body: ITaskNewInfo = {
      title: title,
      order: order,
      description: description,
      userId: userId,
      boardId: boardId,
      columnId: columnId,
    };
    const defaultTask: ITask = {
      id: '',
      title: '',
      order: 0,
      description: '',
      userId: '',
      boardId: '',
      columnId: '',
    };

    return this.http.put<ITask>(req, body).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.error(error.message);
        return of(defaultTask);
      })
    );
  }
}
