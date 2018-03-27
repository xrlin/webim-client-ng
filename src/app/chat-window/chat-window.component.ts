import {AfterContentInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {User} from '../models/user.model';
import {ContactsService} from '../core/contacts.service';
import {GroupsContentComponent} from '../groups-content/groups-content.component';
import {MenuContentDirective} from '../shared/menu-content.directive';
import {FriendsContentComponent} from '../friends-content/friends-content.component';
import {MatDialog} from '@angular/material';
import {AlertDialogComponent, AlertDialogData} from '../alert-dialog/alert-dialog.component';
import {TokenService} from '../core/token.service';
import {SettingComponent} from '../setting/setting.component';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs/Observable';
import {Menu} from '../models/menu.model';
import {MenuService} from '../core/menu.service';
import {Subscription} from 'rxjs/Subscription';
import {MqttService} from '../core/mqtt.service';
import {MessagesContentComponent} from '../messages-content/messages-content.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements AfterContentInit, OnInit, OnDestroy {
  @ViewChild(MenuContentDirective) menuContent: MenuContentDirective;
  // Just make enum available in view.
  users: Array<User>;
  Menu = Menu;

  currentMenu: Menu;

  currentUser: Observable<User>;
  private subscriptions: Subscription = new Subscription();

  constructor(private contactsService: ContactsService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private tokenService: TokenService,
              private userService: UserService,
              private dialog: MatDialog,
              private menuService: MenuService,
              private mqttService: MqttService) {
    this.currentUser = this.userService.currentUser;
    this.subscriptions.add(this.contactsService.contacts.subscribe(users => this.users = users));
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.subscriptions.add(this.menuService.currentMenu.subscribe((menu) => {
      this.currentMenu = menu;
      this.loadComponent();
    }));
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
    maps.set(Menu.groups, GroupsContentComponent);
    maps.set(Menu.contacts, FriendsContentComponent);
    maps.set(Menu.setting, SettingComponent);
    maps.set(Menu.messages, MessagesContentComponent);
    return maps.get(this.currentMenu);
  }

  selectMenu(menu: Menu) {
    this.menuService.setCurrentMenu(menu);
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
