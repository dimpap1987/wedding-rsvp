import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private language = new BehaviorSubject('gr');
  public language$ = this.language.asObservable();

  constructor() { }

  changeLanguage(language: string) {
    this.language.next(language)
  }
}
