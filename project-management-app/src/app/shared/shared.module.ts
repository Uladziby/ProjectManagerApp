import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { CardService } from './services/card.service';
import { BoardService } from './services/board.service';
import { AuthService } from './services/auth.service';
import { SortPipe } from '../board-route/pipes/sort.pipe';

@NgModule({
  declarations: [
    
  ],
  imports: [CommonModule, HttpClientModule],
  exports :[],
  providers: [AuthService, BoardService, CardService, TaskService],
})
export class SharedModule { }
