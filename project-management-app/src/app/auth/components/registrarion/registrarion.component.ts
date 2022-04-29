import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarion',
  templateUrl: './registrarion.component.html',
  styleUrls: ['./registrarion.component.scss']
})
export class RegistrarionComponent implements OnInit {
  form: FormGroup
  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit(): void {

  }


  regUser() {
    console.log({ ...this.form.value });

  }


}
