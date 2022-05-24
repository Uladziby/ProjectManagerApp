import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export interface Login {
  login: string;
  password: string;
}
export interface User extends Login {
  name: string;
}



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User = {
    login: '',
    password: '',
    name: '',
  }
  login: Login = {
    login: '',
    password: ''
  }
  public href: string = "";


  constructor(private router: Router,) {
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

}
