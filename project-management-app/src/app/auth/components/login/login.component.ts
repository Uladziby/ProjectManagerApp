
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/shared/services/board.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSab: Subscription | undefined;
  notFound = false;

  constructor(private authService: AuthService, private router: Router, private board:BoardService) {

    this.form = new FormGroup({

      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
    })

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.aSab) {
      this.aSab.unsubscribe()
    }
  }

  signin() {
    this.form.disable();
    const user = this.form.value
    console.log(user);

    this.aSab = this.authService.signIn(user).subscribe(
      () => {
      //переход на main rout
        //this.router.navigate(['/main']) 
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
