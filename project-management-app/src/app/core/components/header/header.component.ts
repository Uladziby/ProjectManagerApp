import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public slideToggle: boolean = false;
  public lang: string = 'English';
  public panelOpenState = false;
  public isLogin: boolean = false;
  public navbarFixed: boolean = false;

  constructor(private router : Router) {
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
    const user = localStorage.getItem('user');
    user ? (this.isLogin = true) : (this.isLogin = false);
  }

  OnChangeLang(): void {
    this.slideToggle === true
      ? (this.lang = 'Русский')
      : (this.lang = 'English');
  }

  OnLogin(): void {
    this.router.navigate([RouteEnum.login])
    this.onCheckLogin();
  }

  OnLogout(): void {
    this.router.navigate([RouteEnum.start])
    localStorage.clear();
    this.onCheckLogin();
  }

  OnSignUp(): void{
    this.router.navigate([RouteEnum.signup])
  }
  
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    if (window.scrollY >= 100) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
