import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/shared/services/board.service';
import { StateService } from 'src/app/shared/services/state.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { tap } from 'rxjs/operators';
import { IBoard, IColumn, ITask, ITaskDescr } from 'src/app/shared/interfaces/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tasksCache: {
    title: string,
    description: string,
    name: string,
    number: number
  }[] = [];
  resultSearch: ITask[] = []
  searchCategories: ['title', 'description', 'name'] = ['title', 'description', 'name'];
  searchCategory: 'title' | 'description' | 'name' = 'title';
  searchValue: string = ''
  constructor(public state: StateService,
    private tasksService: TaskService,
    private boardService: BoardService,
    private auth: AuthService,
    private langService: LangService) {
    this.form = new FormGroup({
      searchSelect: new FormControl('title', [Validators.required]),
      searchInput: new FormControl('', [Validators.minLength(3)])
    })

  }


  text = TRANSLATE.en.search;
  private subs!: Subscription;

  ngOnInit(): void {
    this.state.users = {};
    const newBoards: IBoard[] = [];
    this.state.tasks = [];
    this.boardService.getBoards().subscribe((boards) => {

      boards.forEach((board) => {
        this.boardService.getBoard(board.id).subscribe((item) => {
          newBoards.push(item)
          this.saveTasks(item.columns)
        });
      })
      this.state.boards = newBoards;
    });
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.text =
        lang === 'English' ? TRANSLATE.en.search : TRANSLATE.ru.search;
    });
  }

  ngOnDestroy(): void {

    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  seachTask() {
    console.log(this.form.valid);
    this.state.search.result = [];
    if (this.form.valid) {



      this.tasksCache.forEach(el => {
        if (el[this.searchCategory].toLowerCase().includes(this.state.search.value.trim().toLowerCase())) {
          const task: ITaskDescr = this.state.tasks[el.number];
          if (task) {
            this.state.search.result[this.state.search.result.length] = task;
          }
        }
      })
    }
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
    tasks.forEach((el) => {


      let name = ''
      this.auth.getUser(el.userId)
        .subscribe((user) => {
          name = user.name;
          if (!this.state.users[user.id]) {
            this.state.users[user.id] = name;
          }

          const task = {
            title: el.title,
            description: el.description,
            name: name,
            number: this.tasksCache.length
          }

          this.tasksCache.push(task);
          this.state.tasks.push(el);
        });

    })

  }


}