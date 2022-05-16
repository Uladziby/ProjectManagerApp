import { debounceTime, Subscription } from 'rxjs';
import { TaskService } from './../../shared/services/task.service';
import {
  IBoard,
  IColumnCreation,
  ITask,
  ITaskCreate,
  ITaskNewInfo,
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
import { LangService } from 'src/app/shared/services/lang.service';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreationModalComponent } from 'src/app/core/modal/creation-modal/creation-modal.component';
import { ApproveModalComponent } from 'src/app/core/modal/approve-modal/approve-modal.component';
import { ModalComponent } from 'src/app/core/modal/modal.component';

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
  private subsLang!: Subscription;
  public lang$ = this.langService.lang$;
  boardText = TRANSLATE.en.board;

  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private taskService: TaskService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private langService: LangService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.currentIdBoard = params['id'])
    );
    this.boardService.getBoard(this.currentIdBoard).subscribe((val) => {
      this.columns$ = val.columns.sort((a, b) => a.order - b.order);
      for (let item of this.columns$) {
        this.connectedTo.push(item.id);
      }
    });
    this.subsLang = this.langService.lang$.subscribe((lang) => {
      this.boardText =
        lang === 'English' ? TRANSLATE.en.board : TRANSLATE.ru.board;
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
      this.updateTaskAfterMove();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskAfterTransfer();
    }
  }

  dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.updateOrderColumn(event.container.data);
  }

  updateOrderColumn(arrOfColumns: IColumn[]) {
    const maxOrder = [...arrOfColumns].reduce(function (a, b) {
      return Math.max(a, b.order) + 1;
    }, -Infinity);
    arrOfColumns.forEach((item, idx) => {
      this.cardService
        .changeColumn(this.currentIdBoard, item.id, {
          title: item.title,
          order: maxOrder + idx,
        })
        .subscribe(() => {
          if (idx === arrOfColumns.length - 1) {
            this.ngOnInit();
          }
        });
    });
  }

  updateTaskAfterMove() {
    console.log(event, 'moveItem');
  }
  updateTaskAfterTransfer() {
    console.log(event, 'transfer');
  }

  onCreateColumn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = this.boardText.modalNewCol;
    const modalDialog = this.matDialog.open(
      CreationModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        const body: IColumnCreation = {
          title: result.title,
          order: this.columns$.length + 1,
        };
        console.log(body, this.currentIdBoard);
        this.cardService.createColumn(this.currentIdBoard, body).subscribe({
          next: (val) => {
            this.columns$.push(val), console.log(val);
          },
          error: () => {
            this.showError();
          },
        });
      }
    });
  }

  onBack() {
    this.router.navigate([RouteEnum.boards]);
  }

  OnCreateTask(columnId: string, lengthOfColumn: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      ...this.boardText.modalNewTask,
      showDescription: true,
    };
    const modalDialog = this.matDialog.open(
      CreationModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: ITaskCreate = {
          title: result.title,
          done: false,
          order: lengthOfColumn + 1,
          description: result.description,
          userId: '99ef8b08-ceb4-4fab-9680-93300a2566cb',
        };
        this.cardService
          .createTask(this.currentIdBoard, columnId, newTask)
          .subscribe({
            next: () => {
              this.ngOnInit();
            },
            error: () => {
              this.showError();
            },
          });
      }
    });
  }
  OnDeleteTask(taskId: string, columnId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '150px';
    dialogConfig.width = '400px';
    const modalDialog = this.matDialog.open(
      ApproveModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService
          .deleteTask(this.currentIdBoard, columnId, taskId)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  OnEditTask(order: number, columnId: string, taskId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      ...this.boardText.modalNewTask,
      showDescription: true,
    };
    const modalDialog = this.matDialog.open(
      CreationModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        const body: ITaskNewInfo = {
          title: result.title,
          done: false,
          order: order,
          description: result.description,
          userId: '99ef8b08-ceb4-4fab-9680-93300a2566cb',
          boardId: this.currentIdBoard,
          columnId: columnId,
        };

        this.taskService.changeTask(body, taskId).subscribe({
          next: () => {
            this.ngOnInit();
          },
          error: () => {
            this.showError();
          },
        });
      }
    });
  }

  OnRemoveColumn(columnId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '150px';
    dialogConfig.width = '400px';
    const modalDialog = this.matDialog.open(
      ApproveModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.cardService
          .deleteColumn(this.currentIdBoard, columnId)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  showError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '150px';
    dialogConfig.width = '400px';
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
