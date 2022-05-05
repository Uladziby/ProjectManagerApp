import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardService } from 'src/app/shared/services/board.service';
import { CreationModalComponent } from '../../modal/creation-modal/creation-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public slideToggle: boolean = false;
  public lang: string = 'English';
  public panelOpenState = false;
  public isLogin: boolean = false;
  public navbarFixed: boolean = false;

  constructor(public matDialog: MatDialog, private boardService: BoardService) {
    localStorage.setItem('user', 'yes');
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', () => this.onScroll(), true);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.onScroll(), true);
    this.onCheckLogin();
  }

  onCheckLogin() {
    const user = localStorage.getItem('user');
    user ? (this.isLogin = true) : (this.isLogin = false);
  }

  OnChangeLang(): void {
    this.slideToggle === true
      ? (this.lang = 'Русский')
      : (this.lang = 'English');
  }
  OnLogin(): void {
    localStorage.setItem('user', 'yes');
    this.onCheckLogin();
  }
  OnLogout(): void {
    localStorage.clear();
    this.onCheckLogin();
  }

  newBoard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '250px';
    dialogConfig.width = '400px';
    dialogConfig.data = { task: 'Enter a new board title', title: 'New Board' };
    const modalDialog = this.matDialog.open(
      CreationModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.boardService.createBoard(result).subscribe((result) => {
          console.log('new board', result);
        });
      }
    });
  }

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    if (window.scrollY >= 100) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
