import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';

enum Menu {
  messages,
  contacts,
  groups,
  reminder
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  // Just make enum available in view.
  Menu = Menu;
  users = Array(5).fill(100);
  user: User = {name: 'xrlin', avatar: ''};
  currentMenu: Menu = Menu.messages;

  constructor() {
  }

  ngOnInit() {
  }

  selectMenu(menu: Menu) {
    this.currentMenu = menu;
  }

}
