import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BoardListComponent, BoardComponent],
  imports: [CommonModule, MatIconModule],
})
export class BoardModule {}
