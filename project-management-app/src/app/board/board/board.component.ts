import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription } from 'rxjs';
import { IBoard } from 'src/app/shared/interfaces/interfaces';
import { BoardService } from 'src/app/shared/services/board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/core/modal/modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() id!: string;
  constructor(
    private boardService: BoardService,
    public matDialog: MatDialog
  ) {}
  private subs!: Subscription;
  board$ = new BehaviorSubject<IBoard>({ id: '', title: '', columns: [] });

  ngOnInit(): void {
    this.subs = this.boardService.getBoard(this.id).subscribe((items) => {
      this.board$.next(items);
      console.log('board', this.board$);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delete() {
    this.boardService
      .deleteBoard(this.id)
      .pipe(catchError((error) => of(`Bad Promise: ${error}`)));
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
