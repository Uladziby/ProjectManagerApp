import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private langService: LangService) {}
  private subs!: Subscription;
  welcomeText = TRANSLATE.en.welcome;

  ngOnInit(): void {
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.welcomeText =
        lang === 'English' ? TRANSLATE.en.welcome : TRANSLATE.ru.welcome;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
