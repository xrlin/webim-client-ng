import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ApiConfig} from '../config/api.config';
import {FileUploadService} from './fileupload.service';

@Injectable()
export class UserService {
  currentUser: Observable<User>;

  update = new Subject<any>();

  constructor(private http: HttpClient, private api: ApiConfig, private fileUploadService: FileUploadService) {
    this.currentUser = this.update.map((user: User) => user).publishReplay(1).refCount();
    this.retrieveProfile();
  }

  retrieveProfile() {
    this.http.get(this.api.getUserProfileApi()).subscribe((resp: HttpResponse<any>) => {
      const user = new User(resp);
      this.update.next(user);
    });
  }

  updateUserName(name: string): Observable<any> {
    return this.http.put(this.api.updateUserProfileApi(), {name: name}).map(() => {
      const subscription = this.currentUser.subscribe((user: User) => {
        if (name === user.name) {
          return;
        }
        user.name = name;
        this.update.next(user);
      });
      subscription.unsubscribe();
    });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(this.api.updatePasswordApi(), {oldPassword: oldPassword, newPassword: newPassword});
  }

  updateAvatar(file: Blob): Observable<any> {
    return this.fileUploadService.uploadFile(file)
      .concatMap((resp: { hash: string, key: string }) => {
        return this.http.put(this.api.updateAvatarApi(), {avatar: resp.hash});
      });
  }

  search(value: string): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.api.searchUsersApi(), {params: {name: value}}).map((resp) => resp.users);
  }
}
