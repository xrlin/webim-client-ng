import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendsService} from '../core/friends.service';
import {User} from '../models/user.model';
import * as _ from 'lodash';
import {UserService} from '../core/user.service';
import {Subscription} from 'rxjs/Subscription';

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

  constructor(private friendsService: FriendsService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.friendsService.friends.subscribe(
      (friends) => this.friends = friends
    ));

    this.subscriptions.add(this.friendsService.currentFriend.subscribe(friend => this.currentFriend = friend));
  }

  hasCurrentFriend(): boolean {
    return this.currentFriend && this.currentFriend.id !== 0;
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

  searchUser() {
    this.userService.search(this.filterString).subscribe((users) => {
      const friendIds: number[] = [];
      _.forEach(this.friends, (friend) => friendIds.push(friend.id));
      this.moreUsers = _.reject(users, (user) => friendIds.includes(user.id));
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
