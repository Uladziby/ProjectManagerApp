import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { IUser } from 'src/app/shared/interfaces/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StateService } from 'src/app/shared/services/state.service';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-registrarion',
  templateUrl: './registrarion.component.html',
  styleUrls: ['./registrarion.component.scss']
})
export class RegistrarionComponent implements OnInit, OnDestroy {
  form: FormGroup
  pass: FormGroup;
  regSab: Subscription | undefined;
  authSab: Subscription | undefined;
  badReg = false;
  sucsess = false;
  wrongLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private state: StateService,
    private langService: LangService
  ) {
    this.pass = new FormGroup({
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      passwordConfirm: new FormControl('', [Validators.minLength(4), Validators.required, this.checkPassEqual.bind(this)]),
    })
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      passwordGRoup: this.pass
    })

  }
  private subs!: Subscription;
  text = TRANSLATE.en.profile;

  ngOnInit(): void {
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.text =
        lang === 'English' ? TRANSLATE.en.profile : TRANSLATE.ru.profile;
    });
  }
  ngOnDestroy(): void {
    if (this.authSab) {
      this.authSab.unsubscribe()
    }
    if (this.regSab) {
      this.regSab.unsubscribe()
    }
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  regUser() {
    const { name, login } = this.form.value;
    const { password, passwordConfirm } = this.pass.value;
    const newUser = { name, login, password };
    const user = { login, password };

    this.form.disable();
    this.regSab = this.authService.signUp(newUser).subscribe(
      () => {
        this.sucsess = true;
        setTimeout(() => {
          this.authSab = this.authService.signIn(user).subscribe(
            () => {
              this.authService.getUsers().pipe(
                tap(
                  (array: IUser[]) => {
                    const currUser = array.find(el => el.login === user.login) as IUser;
                    this.state.updateState(currUser, user.password)
                  }
                )
              ).subscribe();
              this.router.navigate([RouteEnum.start])
            },
            () => {

              this.wrongLogin = true;
              this.form.enable();
              setTimeout(() => {
                this.wrongLogin = false;
              }, 3000)
            }
          );



          this.sucsess = false;

        }, 3000)

      },
      (err) => {

        if (err.status === 409) {
          this.wrongLogin = true;
        } else {
          this.badReg = true;
        }

        this.form.enable();
        setTimeout(() => {
          this.badReg = false;
          this.wrongLogin = false;
        }, 3000)
      }
    );

  }

  private checkPassEqual() {
    if (this.pass) {
      const pass = this.pass
      const a = (group: FormGroup) => {
        if (group.get('password')?.value === group.get('passwordConfirm')?.value) {
          return null
        }
        return { custom: true };
      }
      return a(pass);
    }
    return null;
  }

}
