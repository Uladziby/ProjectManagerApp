import { Router, RouterModule } from '@angular/router';
import { IUser } from './../../../shared/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';
import { RouteEnum } from 'src/app/shared/interfaces/enums';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private langService: LangService, private router : Router) {}
  private subs!: Subscription;
  public userToken!: string ;
  welcomeText = TRANSLATE.en.welcome;

  ngOnInit(): void {
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.welcomeText =
        lang === 'English' ? TRANSLATE.en.welcome : TRANSLATE.ru.welcome;
    });
    this.userToken = localStorage.getItem('userToken')!;    
    this.userToken? this.router.navigate([RouteEnum.boards]):'';
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
