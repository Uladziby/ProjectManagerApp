import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public slideToggle : boolean = false;
  public lang: string ="English";
  public panelOpenState = false;
  public isLogin:boolean = false;
  constructor() { 
    localStorage.setItem('user', 'yes')
  }
  ngOnInit(): void {
    this.onCheckLogin();
    
  }
  
  onCheckLogin(){
    const user = localStorage.getItem('user');
    user? this.isLogin = true: this.isLogin = false;
  }
  OnChangeLang(): void {
    this.slideToggle===true? this.lang='Русский':this.lang='English';
  }
  OnLogout():void{
    localStorage.clear()
    this.onCheckLogin();
  }
}
