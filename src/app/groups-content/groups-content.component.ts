import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../core/groups.service';
import {Group} from '../models/group.models';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material';
import {AlertDialogComponent} from '../alert-dialog/alert-dialog.component';
import {UserSelectorDialogComponent} from '../user-selector-dialog/user-selector-dialog.component';
import {FriendsService} from '../core/friends.service';
import {NewGroupDialogComponent} from '../new-group-dialog/new-group-dialog.component';
import {FileUploadService} from '../core/fileupload.service';
import {NotificationService} from '../core/notification.service';
import {ThreadService} from '../core/thread.service';
import {MenuService} from '../core/menu.service';
import {Menu} from '../models/menu.model';

@Component({
  selector: 'app-room-content',
  templateUrl: './groups-content.component.html',
  styleUrls: ['./groups-content.component.scss'],
})
export class GroupsContentComponent implements OnInit, OnDestroy {

  filterString = '';
  currentGroup: Group = <Group>{};
  filteredGroups: Group[] = [];
  moreGroups: Group[] = [];
  private groups: Group[];
  private subscriptions: Subscription = new Subscription();

  constructor(private groupService: GroupsService,
              private dialog: MatDialog,
              private friendsService: FriendsService,
              private fileService: FileUploadService,
              private notificationService: NotificationService,
              private threadService: ThreadService,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.groupService.groups.subscribe((groups: Group[]) => {
      return this.groups = groups;
    }));
    this.subscriptions.add(this.groupService.currentGroup.subscribe((group) => this.currentGroup = group));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onFilter(): boolean {
    return this.filterString !== '';
  }

  updateName = (name: string) => {
    this.groupService.updateGroup(this.currentGroup.id, {name: name}).subscribe();
  }

  hasCurrentGroup(): boolean {
    return this.currentGroup.id && this.currentGroup.id !== 0;
  }

  hasGroup(group: Group): boolean {
    if (!this.groups) {
      return false;
    }
    for (const g of this.groups) {
      if (g.id === group.id) {
        return true;
      }
    }
    return false;
  }

  setCurrentGroup(group: Group) {
    this.groupService.setCurrentGroup(group);
  }

  launchTread() {
    this.threadService.createThread(this.currentGroup.id, 'group');
    this.menuService.setCurrentMenu(Menu.messages);
  }

  joinGroup(groupID: number) {
    this.groupService.joinGroup(groupID).subscribe();
  }

  leaveGroup(groupID: number) {
    this.groupService.leaveGroup(groupID).subscribe();
  }

  filterGroups(name: string) {
    this.filterString = name;
    this.moreGroups = [];
    this.groupService.groups.subscribe(
      (groups) => {
        this.filteredGroups = _.filter(groups, (group) => group.name.includes(name));
      }
    );
  }

  groupList() {
    if (this.onFilter()) {
      return this.filteredGroups;
    }
    return this.groups;
  }

  searchGroups() {
    this.groupService.searchGroups(this.filterString).subscribe(
      (groups: Group[]) => {
        const groupIds: number[] = [];
        _.forEach(this.groups, (group) => groupIds.push(group.id));
        this.moreGroups = _.reject(groups, (group: Group) => groupIds.includes(group.id));
      }
    );
  }

  showLeaveConfirmDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent,
      {data: {message: 'Confirm to leave this room ?'}});
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm === 'true') {
        this.leaveGroup(this.currentGroup.id);
      }
    });
  }

  inviteFriends(friendIds: number[]) {
    this.groupService.inviteGroup(this.currentGroup.id, friendIds).subscribe();
  }

  openNewGroupDialog() {
    this.dialog.open(NewGroupDialogComponent, {data: this.currentGroup, width: '500px', height: '400px'});
  }

  openFriendSelectorDialog() {
    let availableUsers = [];
    const subscription = this.friendsService.friends.subscribe((users) => {
      const groupUserIds: number[] = [];
      _.each(this.currentGroup.users, (u) => groupUserIds.push(u.id));
      availableUsers = _.reject(users, (u) => groupUserIds.includes(u.id));
    });
    subscription.unsubscribe();
    const dialogRef = this.dialog.open(UserSelectorDialogComponent, {data: {items: availableUsers}});
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.inviteFriends(confirm);
      }
    });
  }

  updateAvatar(blob: Blob) {
    this.fileService.uploadFile(blob).concatMap(
      (resp: { hash: string }) => {
        return this.groupService.updateGroup(this.currentGroup.id, {avatar: resp.hash});
      }
    ).subscribe({
        error: () => {
          this.notificationService.addNotification('update group failed', 'error');
        }
      }
    );
  }

}
