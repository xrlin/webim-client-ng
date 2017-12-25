import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {ContactsService} from '../core/contacts.service';
import {Room} from '../models/room.models';
import {RoomsService} from '../core/rooms.service';

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
  users: Array<User>;
  user: User = new User({name: 'xrlin', avatar: ''});
  currentMenu: Menu = Menu.messages;

  rooms: Room[];

  constructor(private contactsService: ContactsService, private groupService: RoomsService) {

  }

  ngOnInit() {
    this.contactsService.contacts.subscribe(users => this.users = users);
    this.groupService.rooms.subscribe((groups: Room[]) => this.rooms = groups);
  }

  selectMenu(menu: Menu) {
    this.currentMenu = menu;
  }

}
