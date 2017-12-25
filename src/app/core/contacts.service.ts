import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/scan';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

interface Friends {
  [friends: string]: User[];
}

type ContactOperation = (users: User[]) => User[];

const GetFriendApi = 'http://localhost:8080/api/friends';
const InitUsers: User[] = [];

@Injectable()
export class ContactsService {
  contacts: Observable<User[]>;

  updates: Subject<any> = new Subject<any>();

  initContacts: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    this.contacts = this.updates
      .scan((users: User[], operation: ContactOperation) => operation(users), InitUsers)
      .publishReplay(1).refCount();

    this.initContacts.map((contacts: User[]) => (users: User[]) => users).subscribe(this.updates);

    this.http.get<Friends>(GetFriendApi).subscribe((friends: Friends) => this.initContacts.next(friends.friends));
  }
}
