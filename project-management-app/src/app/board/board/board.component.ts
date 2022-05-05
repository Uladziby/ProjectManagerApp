import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription } from 'rxjs';
import { IBoard, IBoards } from 'src/app/shared/interfaces/interfaces';
import { BoardService } from 'src/app/shared/services/board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ApproveModalComponent } from 'src/app/core/modal/approve-modal/approve-modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() id!: string;
  @Input() boardList$!: BehaviorSubject<IBoards[]>;
  constructor(
    private boardService: BoardService,
    public matDialog: MatDialog
  ) {}
  private subs!: Subscription;
  board$ = new BehaviorSubject<IBoard>({ id: '', title: '', columns: [] });

  ngOnInit(): void {
    this.subs = this.boardService.getBoard(this.id).subscribe((items) => {
      this.board$.next(items);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delete() {
    this.boardService.deleteBoard(this.id).subscribe(() => {
      this.boardService.getBoards().subscribe((items) => {
        this.boardList$.next(items);
        console.log('board list', this.boardList$);
      });
    });
  }

  openApproveModal() {
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
      console.log(result);
      if (result) {
        this.delete();
      }
    });
  }
}
