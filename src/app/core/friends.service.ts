import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {Subject} from 'rxjs/Subject';
import {ApiConfig} from '../config/api.config';
import {HttpClient} from '@angular/common/http';

type UserOperation = (users: User[]) => User[];
const InitUsers: User[] = [];

interface Resp {
  friends: User[];
}

@Injectable()
export class FriendsService {
  friends: Observable<User[]>;

  updates: Subject<any> = new Subject<any>();

  retrieve: Subject<any> = new Subject<any>();

  constructor(private api: ApiConfig, private http: HttpClient) {
    this.friends = this.updates
      .scan(((users: User[], operation: UserOperation) => operation(users)), InitUsers)
      .publishReplay(1).refCount();

    this.retrieve.map((users: User[]) => (us: User[]) => us).subscribe(this.updates);

    this.http.get<Resp>(api.getFriendsApi()).subscribe((resp: Resp) => this.retrieve.next(resp.friends));
  }
}
