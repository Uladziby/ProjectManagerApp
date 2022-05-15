import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/shared/services/board.service';
import { StateService } from 'src/app/shared/services/state.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { tap } from 'rxjs/operators';
import { IBoard, IColumn, ITask, ITaskDescr } from 'src/app/shared/interfaces/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tasksCache: {
    title: string,
    text: string,
    name: string,
    number: number
  }[] = [];
  resultSearch: ITask[] = []
  searchCategories: string[] = ['title', 'text', 'name'];
  searchCategory: 'title' | 'text' | 'name' = 'title';
  searchValue: string = ''
  constructor(public state: StateService,
    private tasksService: TaskService,
    private boardService: BoardService,
    private auth: AuthService) { }

  ngOnInit(): void {
    const newBoards: IBoard[] = [];
    this.boardService.getBoards().pipe(
      tap((boards) => {
        this.state.tasks = [];
        boards.forEach((board) => {
          this.boardService.getBoard(board.id).pipe(
            tap((item) => {
              newBoards.push(item)
              this.saveTasks(item.columns)
            })
          ).subscribe();
        })
        this.state.boards = newBoards;
      })
    ).subscribe();

  }
  seachTask() {
    if (this.tasksCache.length === 0) {
      this.state.tasks.forEach((el, ind) => {
        let name = ''
        this.auth.getUser(el.userId).pipe(
          tap((user) => {
            name = user.name;
            const task = {
              title: el.title,
              text: el.description,
              name: name,
              number: ind
            }
            this.tasksCache.push(task);

          })
        ).subscribe();

      })

    }
    console.log(this.tasksCache);

    this.state.search.result = []
    this.tasksCache.forEach(el => {
      if (el[this.searchCategory].toLowerCase().includes(this.state.search.value.trim().toLowerCase())) {
        const task: ITaskDescr = this.state.tasks[el.number];
        if (task) {
          this.state.search.result[this.state.search.result.length] = task;
        }
      }
    })
    console.log(this.state.search.result);


  }

  saveTasks(colums: IColumn[]) {
    let tasks: ITaskDescr[] = [];

    if (colums.length > 0) {
      colums.forEach(colum => {
        if (colum.tasks.length > 0) {
          tasks = [...tasks, ...colum.tasks]
        }
      })
    }
    this.state.tasks = [... this.state.tasks, ...tasks]

  }


}