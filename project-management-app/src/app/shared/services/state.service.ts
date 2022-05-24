import { Injectable } from '@angular/core';
import { IBoard, IBoards, ITaskDescr, IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  userPass: string;
  tasks: ITaskDescr[] = [];
  boards: IBoard[] = [];
  boardsList: IBoards[] = [];
  user: IUser = {
    login: '',
    id: '',
    name: 'Guest'
  };
  users: { [key: string]: string } = {}
  search: { value: string, result: ITaskDescr[] | [] } = {
    value: "",
    result: [],
  };


  constructor() {
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.user = JSON.parse(user);
    }
    this.userPass = localStorage.getItem('userPass') || '';
  }

  updateState(user: IUser, pass: string) {
    this.user = user;
    this.userPass = pass;
    localStorage.setItem('userInfo', JSON.stringify(user))
    localStorage.setItem('userPass', pass);
  }

}
