import { Subscription } from 'rxjs';
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
import { Router, ActivatedRoute } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-board-route',
  templateUrl: './board-route.component.html',
  styleUrls: ['./board-route.component.scss'],
})
export class BoardRouteComponent implements OnInit {
  public subscription!: Subscription;
  public columns$!: IColumn[];
  public currentIdBoard!: string;
  public connectedTo: string[] = [];

  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private taskService: TaskService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.currentIdBoard = params['id'])
    );
    this.boardService.getBoard(this.currentIdBoard).subscribe((val) => {
      this.columns$ = val.columns;
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

  onCreateColumn() {
    console.log(this.columns$.length);
    const body: IColumnCreation = {
      title: 'New Column',
      order: this.columns$.length + 1,
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

  OnCreateTask(columnId: string, lengthOfColumn: number) {
    console.log(lengthOfColumn);
    const newTask: ITaskCreate = {
      title: 'new Issue',
      done: false,
      order: lengthOfColumn + 1,
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

  OnRemoveColumn(columnId: string) {
    this.cardService
      .deleteColumn(this.currentIdBoard, columnId)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
