import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

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

  constructor() {
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
    localStorage.setItem('user', 'yes');
    this.onCheckLogin();
  }
  OnLogout(): void {
    localStorage.clear();
    this.onCheckLogin();
  }

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    if (window.scrollY >= 100) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
