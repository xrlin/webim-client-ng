import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendsService} from '../core/friends.service';
import {User} from '../models/user.model';
import * as _ from 'lodash';
import {UserService} from '../core/user.service';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog} from '@angular/material';
import {AlertDialogComponent} from '../alert-dialog/alert-dialog.component';
import {ThreadService} from '../core/thread.service';
import {MenuService} from '../core/menu.service';
import {Menu} from '../models/menu.model';

@Component({
  selector: 'app-friends-content',
  templateUrl: './friends-content.component.html',
  styleUrls: ['./friends-content.component.scss']
})
export class FriendsContentComponent implements OnInit, OnDestroy {

  friends: User[];

  filteredFriends: User[];

  filterString = '';

  moreUsers: User[];

  currentFriend: User;

  subscriptions = new Subscription();

  constructor(private friendsService: FriendsService, private userService: UserService, private dialog: MatDialog,
              private threadService: ThreadService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.friendsService.friends.subscribe(
      (friends) => this.friends = friends
    ));

    this.subscriptions.add(this.friendsService.currentFriend.subscribe(friend => this.currentFriend = friend));
  }

  hasCurrentFriend(): boolean {
    return this.currentFriend.id && this.currentFriend.id !== 0;
  }

  setCurrentFriend(friend: User) {
    this.friendsService.setCurrentFriend(friend);
  }

  hasFriendship(user: User): boolean {
    if (!this.friends) {
      return false;
    }
    for (const u of this.friends) {
      if (u.id === user.id) {
        return true;
      }
    }
    return false;
  }

  addFriend(userID: number) {
    this.friendsService.addFriend(userID).subscribe();
  }

  showDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {data: {message: 'Are you sure want to delete this friend ?'}});
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm === 'true') {
        this.deleteFriend(this.currentFriend.id);
      }
    });
  }

  deleteFriend(friendID: number) {
    this.friendsService.deleteFriend(friendID).subscribe();
  }

  filterFriends(value: string) {
    this.filterString = value;
    this.moreUsers = [];
    this.friendsService.friends.subscribe((friends) => {
      this.filteredFriends = _.filter(friends, (friend) => friend.name.includes(value));
    });
  }

  onFilter(): boolean {
    return this.filterString !== '';
  }

  searchUsers() {
    this.userService.search(this.filterString).subscribe((users) => {
      const friendIds: number[] = [];
      _.forEach(this.friends, (friend) => friendIds.push(friend.id));
      this.moreUsers = _.reject(users, (user) => friendIds.includes(user.id));
    });
  }

  launchThread() {
    const id = this.currentFriend.id;
    this.threadService.createThread(id, 'p2p');
    this.menuService.setCurrentMenu(Menu.messages);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
