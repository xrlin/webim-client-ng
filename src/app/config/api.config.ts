import {Inject, Injectable} from '@angular/core';

@Injectable()
export class ApiConfig {

  constructor(@Inject('endpoint') private endpoint: string) {
    this.endpoint = endpoint;
  }

  getTokenApi(): string {
    return `${this.endpoint}/user/token`;
  }

  getRoomsApi(): string {
    return `${this.endpoint}/user/rooms`;
  }

  getFriendsApi(): string {
    return `${this.endpoint}/friends`;
  }

  getUserProfileApi(): string {
    return `${this.endpoint}/user/info`;
  }

  updateUserProfileApi(): string {
    return `${this.endpoint}/user/profile`;
  }

  updatePasswordApi(): string {
    return `${this.endpoint}/user/password`;
  }

  getUploadTokenApi(): string {
    return `${this.endpoint}/qiniu/uptoken`;
  }

  fileUploadApi(): string {
    return `https://upload-z2.qiniup.com`;
  }

  updateAvatarApi(): string {
    return `${this.endpoint}/user/avatar`;
  }

  addFriendApi(): string {
    return `${this.endpoint}/friends`;
  }

  deleteFriendApi(friendID: number | string): string {
    return `${this.endpoint}/friend/${friendID}`;
  }

  searchUsersApi(): string {
    return `${this.endpoint}/users/search`;
  }
}
