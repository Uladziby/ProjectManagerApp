import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, map, Subscription, switchMap } from 'rxjs';
import { IBoards } from 'src/app/shared/interfaces/interfaces';
import { BoardService } from 'src/app/shared/services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  constructor(private boardService: BoardService) {}
  private subs!: Subscription;
  boardList$ = new BehaviorSubject<IBoards[]>([]);

  ngOnInit(): void {
    this.subs = this.boardService.getBoards().subscribe((items) => {
      this.boardList$.next(items);
      console.log('board list', this.boardList$);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
