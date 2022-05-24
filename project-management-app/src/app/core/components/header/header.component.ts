import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardService } from 'src/app/shared/services/board.service';
import { CreationModalComponent } from '../../modal/creation-modal/creation-modal.component';
import { LangService } from 'src/app/shared/services/lang.service';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public slideToggle: boolean = false;
  public lang$ = this.langService.lang$;
  public panelOpenState = false;
  public isLogin: boolean = false;
  public navbarFixed: boolean = false;
  headerText = TRANSLATE.en.header;
  modalText = TRANSLATE.en.createBoard;

  constructor(
    public matDialog: MatDialog,
    private boardService: BoardService,
    private router: Router,
    private langService: LangService,
    public state: StateService,
    public auth: AuthService
  ) {
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
    return this.auth.isAuth();
  }

  OnChangeLang(): void {
    if (this.slideToggle === true) {
      this.langService.changeLang('Русский');
      this.headerText = TRANSLATE.ru.header;
      this.modalText = TRANSLATE.ru.createBoard;
    } else {
      this.langService.changeLang('English');
      this.headerText = TRANSLATE.en.header;
      this.modalText = TRANSLATE.en.createBoard;
    }

    // this.slideToggle === true
    //   ? (this.lang = 'Русский')
    //   : (this.lang = 'English');
  }

  OnLogin(): void {
    this.router.navigate([RouteEnum.login]);
    this.onCheckLogin();
  }

  OnLogout(): void {
    this.router.navigate([RouteEnum.start]);
    this.auth.logout();
  }
  editProfile() {
    this.router.navigate([RouteEnum.editProfile]);
  }
  OnSignUp(): void {
    this.router.navigate([RouteEnum.signup]);
  }
  toBoards(): void {
    if (this.state.search.value.length) {
      this.state.search.value = '';
    }
    this.router.navigate([RouteEnum.boards]);
  }
  newBoard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-approve-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      ...this.modalText,
      showDescription: true,
    };
    const modalDialog = this.matDialog.open(
      CreationModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService
          .createBoard(result.title, result.description)
          .subscribe({
            next: (board) => {
              this.state.boardsList.push(board);
            },
            error: () => {
              this.showError();
            },
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

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    if (window.scrollY >= 100) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
