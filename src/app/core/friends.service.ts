import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {ApiConfig} from '../config/api.config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FriendsService {
  friendsSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  currentFriend: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private api: ApiConfig, private http: HttpClient) {
    this.retrieve();
  }

  private _friends: User[] = [];

  get friends(): Observable<User[]> {
    return this.friendsSubject;
  }

  /**
   * Retrieve friends from api and update the friends observable(will cover previous values of friends).
   */
  retrieve() {
    return this.http.get<{ friends: User[] }>(this.api.getFriendsApi()).map(
      (resp) => {
        this._friends = _.cloneDeep(resp.friends);
        this.friendsSubject.next(this._friends);
        return resp.friends;
      }
    ).subscribe();
  }

  addFriend(friendID: number): Observable<User | HttpErrorResponse> {
    return this.http.post<{ friend: User }>(this.api.addFriendApi(), {friendID}).map(
      (resp) => {
        this._friends = _.concat(this._friends, resp.friend);
        this.friendsSubject.next(this._friends);
        return resp.friend;
      }
    );
  }

  deleteFriend(friendID: number): Observable<void | HttpErrorResponse> {
    return this.http.delete<{ friend: User }>(this.api.deleteFriendApi(friendID)).map(
      () => {
        this._friends = _.reject(this._friends, (user) => user.id === friendID);
        this.friendsSubject.next(this._friends);
      }
    );
  }

  setCurrentFriend(friend: User) {
    this.currentFriend.next(friend);
  }
}
