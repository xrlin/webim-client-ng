import {Inject, Injectable} from '@angular/core';

@Injectable()
export class ApiConfig {

  constructor(@Inject('endpoint') private endpoint: string) {
    this.endpoint = endpoint;
  }

  getTokenApi(): string {
    return `${this.endpoint}/user/token`;
  }

  getGroupsApi(): string {
    return `${this.endpoint}/user/rooms`;
  }

  joinGroupApi(groupID: number): string {
    return `${this.endpoint}/room/${groupID}/join`;
  }

  leaveGroupApi(groupID: number): string {
    return `${this.endpoint}/room/${groupID}/leave`;
  }

  createGroupApi(): string {
    return `${this.endpoint}/rooms`;
  }

  searchGroupApi(): string {
    return `${this.endpoint}/rooms/search`;
  }

  updateGroupApi(roomID: string | number): string {
    return `${this.endpoint}/room/${roomID}`;
  }

  groupProfileApi(roomID: number | string): string {
    return `${this.endpoint}/room/${roomID}`;
  }

  groupInviteApi(roomID: number): string {
    return `${this.endpoint}/room/${roomID}/invite`;
  }

  getFriendsApi(): string {
    return `${this.endpoint}/friends`;
  }

  getUserProfileApi(id?: string | number): string {
    if (id) {
      return `${this.endpoint}/user/info?id=${id}`;
    }
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

  sendMessageApi(): string {
    return `${this.endpoint}/message/push`;
  }
}
