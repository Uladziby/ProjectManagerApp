import { TaskService } from './../../shared/services/task.service';
import {
  IBoard,
  IColumnCreation,
  ITaskCreate,
} from './../../shared/interfaces/interfaces';
import { CardService } from './../../shared/services/card.service';
import { BoardService } from './../../shared/services/board.service';
import { Component, OnInit } from '@angular/core';
import { IColumn } from 'src/app/shared/interfaces/interfaces';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-board-route',
  templateUrl: './board-route.component.html',
  styleUrls: ['./board-route.component.scss'],
})
export class BoardRouteComponent implements OnInit {
  public columns$!: IColumn[];
  public currentIdBoard!: string;
  public connectedTo: string[]=[];

  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private taskService: TaskService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentIdBoard = '780e9390-43cc-4035-9f3e-caf60b5225ec';
    this.boardService.getBoard(this.currentIdBoard).subscribe((val) => {
      this.columns$ = val.columns;
       console.log(val);
       for (let item of this.columns$) {
        this.connectedTo.push(item.id);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.item.data === 'Try to move me') {
      console.log("this isn't happening today");
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  dropColomnList(event: CdkDragDrop<any[]>) {
    console.log(event);
  }

  onCreateColumn() {
    const body: IColumnCreation = {
      title: 'Backlog',
      order: 5,
    };
    this.cardService
      .createColumn(this.currentIdBoard, body)
      .subscribe((val) => {
        this.columns$.push(val), console.log(val);
      });
  }

  onBack() {
    this.router.navigate([RouteEnum.boards]);
  }
  OnCreateTask(columnId: string) {
    const newTask: ITaskCreate = {
      title: 'new Issue',
      done: false,
      order: 9,
      description: 'create smth',
      userId: '99ef8b08-ceb4-4fab-9680-93300a2566cb',
    };
    this.cardService
      .createTask(this.currentIdBoard, columnId, newTask)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  OnDeleteTask(taskId: string, columnId: string) {
    this.taskService
      .deleteCard(this.currentIdBoard, columnId, taskId)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  OnEditTask() {}
}
