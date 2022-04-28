import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public slideToggle : boolean = false;
  public lang: string ="English";

  constructor() { }
  ngOnInit(): void {
  }
 

  OnChangeLang(): void {
    this.slideToggle===true? this.lang='Russia':this.lang='English';
  }

}
