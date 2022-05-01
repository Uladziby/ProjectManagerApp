import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup


  constructor() {

    this.form = new FormGroup({

      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
    })

  }

  ngOnInit(): void {

  }

  regUser() {
    console.log({ ...this.form.value });

  }



}
