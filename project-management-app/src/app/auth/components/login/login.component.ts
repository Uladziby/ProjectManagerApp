
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/shared/services/board.service';
import { IUser, IUserSignIn } from 'src/app/shared/interfaces/interfaces';
import { StateService } from 'src/app/shared/services/state.service';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSab: Subscription | undefined;
  notFound = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private board: BoardService,
    private state: StateService,
    private langService: LangService
  ) {

    this.form = new FormGroup({

      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
    })

  }

  private subs!: Subscription;
  text = TRANSLATE.en.login;

  ngOnInit(): void {
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.text =
        lang === 'English' ? TRANSLATE.en.login : TRANSLATE.ru.login;
    });
  }



  ngOnDestroy(): void {
    if (this.aSab) {
      this.aSab.unsubscribe();
    }
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  signin() {
    this.form.disable();
    const user = this.form.value


    this.aSab = this.authService.signIn(user).subscribe(
      () => {
        this.authService.getUsers().pipe(
          tap(
            (array: IUser[]) => {
              const currUser = array.find(el => el.login === user.login) as IUser;
              this.state.updateState(currUser, user.password)
            }
          )
        ).subscribe();
        this.router.navigate(['/boards'])
      },
      () => {

        this.notFound = true;
        this.form.enable();
        setTimeout(() => {
          this.notFound = false;
        }, 3000)
      }
    );

  }

}
