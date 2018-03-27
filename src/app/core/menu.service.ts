import {Injectable} from '@angular/core';
import {Menu} from '../models/menu.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

const DefaultMenu = Menu.messages;

@Injectable()
export class MenuService {
  private menuSubject: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(DefaultMenu);

  constructor() {
  }

  get currentMenu(): Observable<Menu> {
    return this.menuSubject;
  }

  setCurrentMenu(menu: Menu) {
    this.menuSubject.next(menu);
  }
}
