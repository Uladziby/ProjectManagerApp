import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  wrongLogin=false;
  constructor(private router: Router, private authService:AuthService) {
    this.pass = new FormGroup({
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      passwordConfirm: new FormControl('', [Validators.minLength(4), Validators.required]),
    }, this.checkPassEqual.bind(this))
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      passwordGRoup: this.pass
    })

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.authSab) {
      this.authSab.unsubscribe()
    } 
    if (this.regSab) {
      this.regSab.unsubscribe()
    }
  }

  regUser() {
    const { name, login } = this.form.value;
    const { password, passwordConfirm } = this.pass.value;
    const newUser = { name, login, password };
    const user = {login, password};

    this.form.disable();

    console.log(newUser);

    this.regSab = this.authService.signUp(newUser).subscribe(
      () => {
        this.sucsess = true;
        setTimeout(()=>{
          this.authSab = this.authService.signIn(user).subscribe();
          //переход на main rout
          //this.router.navigate(['/main']) 
        this.sucsess = false;

        }, 3000)
        
      },
      (err) => {

if(err.status===409){
  this.wrongLogin = true;
} else{
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
