import { IBoard, IColumnCreation } from './../../shared/interfaces/interfaces';
import { CardService } from './../../shared/services/card.service';
import { BoardService } from './../../shared/services/board.service';
import { Component, OnInit } from '@angular/core';
import { IColumn } from 'src/app/shared/interfaces/interfaces';
import { dataBoard } from 'src/app/board-route/mock-date';
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
  public dataBoard: IColumn = dataBoard;
  public columns!: IBoard;
  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((val) => console.log(val));
    this.boardService
      .getBoard('2e115690-3017-4773-b261-9fe9979d297d')
      .subscribe((val) => (this.columns = val));
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.dataBoard.tasks,
      event.previousIndex,
      event.currentIndex
    );
    console.log(event);
  }
  onCreateColumn() {
    const body: IColumnCreation = {
      title: 'Backlog',
      order: 5,
    };
    this.cardService
      .createColumn('2e115690-3017-4773-b261-9fe9979d297d', body)
      .subscribe((val) => console.log(val));
  }
  onBack() {
    this.router.navigate([RouteEnum.boards]);
  }
  OnDeleteTask() {}
  OnEditTask() {}
}
