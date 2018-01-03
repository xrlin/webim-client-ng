import {AfterContentInit, Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {User} from '../models/user.model';
import {ContactsService} from '../core/contacts.service';
import {RoomContentComponent} from '../rooms-content/rooms-content.component';
import {MenuContentDirective} from '../shared/menu-content.directive';
import {FriendsContentComponent} from '../friends-content/friends-content.component';
import {MatDialog} from '@angular/material';
import {AlertDialogComponent, AlertDialogData} from '../alert-dialog/alert-dialog.component';
import {TokenService} from '../core/token.service';
import {SettingComponent} from '../setting/setting.component';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs/Observable';

enum Menu {
  messages,
  contacts,
  groups,
  reminder,
  setting,
  logout
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements AfterContentInit, OnInit {
  @ViewChild(MenuContentDirective) menuContent: MenuContentDirective;
  // Just make enum available in view.
  Menu = Menu;
  users: Array<User>;

  currentMenu: Menu = Menu.messages;

  currentUser: Observable<User>;

  constructor(private contactsService: ContactsService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private tokenService: TokenService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.currentUser = this.userService.currentUser;

  }

  ngOnInit() {
    this.contactsService.contacts.subscribe(users => this.users = users);
  }

  ngAfterContentInit() {
    this.loadComponent();
  }

  loadComponent() {
    const component = this.getComponent();
    const viewContainerRef = this.menuContent.viewContainerRef;
    viewContainerRef.clear();
    if (!component) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainerRef.createComponent(componentFactory);
  }

  // return the corresponding component of selected menu
  getComponent(): Type<any> {
    const maps = new Map();
    maps.set(Menu.groups, RoomContentComponent);
    maps.set(Menu.contacts, FriendsContentComponent);
    maps.set(Menu.setting, SettingComponent);
    return maps.get(this.currentMenu);
  }

  selectMenu(menu: Menu) {
    this.currentMenu = menu;
    this.loadComponent();
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: <AlertDialogData>{message: 'Are you sure to log out ?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.logout();
      }
    });
  }

  logout() {
    this.tokenService.logout();
  }

}
