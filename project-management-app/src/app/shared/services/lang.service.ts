import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LangType } from '../interfaces/lang';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  public lang$ = new BehaviorSubject<LangType>('English');

  changeLang(lang: LangType) {
    this.lang$.next(lang);
  }
}
