import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [BoardListComponent, BoardComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BoardListComponent, BoardComponent],
  providers: [
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BoardModule {}
