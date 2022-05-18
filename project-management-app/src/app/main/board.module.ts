import { BoardRoutingModule } from './board-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreModule } from '../core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './search/search.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BoardListComponent, BoardComponent, SearchComponent],
  imports: [
    CommonModule,
    MatIconModule,
    CoreModule,
    BoardRoutingModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BoardListComponent, BoardComponent],
  providers: [
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BoardModule { }
