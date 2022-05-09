import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StateService } from 'src/app/shared/services/state.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApproveModalComponent } from 'src/app/core/modal/approve-modal/approve-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

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
    public matDialog: MatDialog

  ) {

    this.pass = new FormGroup({
      password: new FormControl(this.state.userPass, [Validators.minLength(4), Validators.required]),
      passwordConfirm: new FormControl(this.state.userPass, [Validators.minLength(4), Validators.required]),
    }, this.checkPassEqual.bind(this))
    this.form = new FormGroup({
      name: new FormControl(this.state.user.name, [Validators.required]),
      login: new FormControl({ value: this.state.user.login, disabled: true }, Validators.required),
      passwordGRoup: this.pass
    })
  }

  ngOnInit(): void {
    this.form.controls['login'].disable();

  }
  ngOnDestroy(): void {
    if (this.authSab) {
      this.authSab.unsubscribe()
    }
    if (this.regSab) {
      this.regSab.unsubscribe()
    }
  }

  updateUser() {
    let { name, login } = this.form.value;
    login = this.state.user.login;
    const { password, passwordConfirm } = this.pass.value;
    const newUser = { name, login, password };


    this.form.disable();

    this.regSab = this.authService.changeUser(this.state.user.id, newUser).subscribe(
      (user) => {
        this.state.updateState(user, password)
        this.form.enable();
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
  deleteProfile() {

    this.form.disable();

    this.regSab = this.authService.deleteUser(this.state.user.id,).subscribe(
      () => {
        this.authService.logout();

        this.router.navigate(['/login'])
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
      if (result) {
        this.deleteProfile()
      }
    });
  }

}
