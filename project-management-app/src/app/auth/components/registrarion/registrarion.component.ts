import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarion',
  templateUrl: './registrarion.component.html',
  styleUrls: ['./registrarion.component.scss']
})
export class RegistrarionComponent implements OnInit {
  form: FormGroup
  pass: FormGroup

  constructor() {
    this.pass = new FormGroup({
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      passwordConfirm: new FormControl('', [Validators.minLength(4), Validators.required]),
    }, this.passEqual.bind(this))
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      passwordGRoup: this.pass
    })

  }

  ngOnInit(): void {

  }

  regUser() {
    console.log({ ...this.form.value });

  }

  private passEqual() {
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
