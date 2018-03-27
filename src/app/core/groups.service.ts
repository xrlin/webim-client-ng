import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {Observable} from 'rxjs/Observable';
import {Group} from '../models/group.models';
import 'rxjs/add/operator/scan';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class GroupsService {

  currentGroup: BehaviorSubject<Group> = new BehaviorSubject(<Group>{});
  private groupSubject: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);

  constructor(private api: ApiConfig, private http: HttpClient) {
    this.retrieve();
  }

  private _groups: Group[] = [];

  get groups(): BehaviorSubject<Group[]> {
    return this.groupSubject;
  }

  retrieve() {
    this.http.get<{ rooms: Group[] }>(this.api.getGroupsApi()).subscribe((resp) => {
      this._groups = resp.rooms;
      this.groupSubject.next(this._groups);
    });
  }

  joinGroup(groupID: number): Observable<Group | HttpErrorResponse> {
    return this.http.post<{ room: Group }>(this.api.joinGroupApi(groupID), {}).map(
      (resp) => {
        this._groups = _.concat(this._groups, resp.room);
        this.groupSubject.next(this._groups);
        return resp.room;
      }
    );
  }

  leaveGroup(groupID: number): Observable<any> {
    return this.http.delete(this.api.leaveGroupApi(groupID)).map(
      (resp) => {
        this._groups = _.reject(this._groups, (group) => group.id === groupID);
        this.groupSubject.next(this._groups);
        return resp;
      }
    );
  }

  createGroup({name, avatar}): Observable<Group | HttpErrorResponse> {
    return this.http.post<{ room: Group }>(this.api.createGroupApi(), {name, avatar}).map(
      (resp) => {
        this._groups = _.concat(this._groups, resp.room);
        this.groupSubject.next(this._groups);
        return resp.room;
      }
    );
  }

  // Invite users to group
  inviteGroup(groupID: number, userIds: number[]): Observable<any> {
    return this.http.post(this.api.groupInviteApi(groupID), {userIds: userIds}).map(
      () => {
        this.refreshGroupProfile(groupID);
      }
    );
  }

  refreshGroupProfile(groupID: number) {
    this.http.get<{ room: Group }>(this.api.groupProfileApi(groupID)).map(
      (resp) => {
        const group = resp.room;
        this._groups = this.updateGroupList(group);
        this.groupSubject.next(this._groups);
      }
    );
  }

  searchGroups(name: string): Observable<Group[] | HttpErrorResponse> {
    return this.http.get<{ rooms: Group[] }>(this.api.searchGroupApi(), {params: {name: name}}).map(
      (resp) => {
        return resp.rooms;
      }
    );
  }

  setCurrentGroup(group: Group) {
    this.currentGroup.next(group);
  }

  updateGroup(id, params: { name?: string, avatar?: string }): Observable<Group | HttpErrorResponse> {
    return this.http.put<{ room: Group }>(this.api.updateGroupApi(id), params).map(
      (resp) => {
        const group = resp.room;
        this._groups = this.updateGroupList(group);
        this.groupSubject.next(this._groups);
        this.setCurrentGroup(group);
        return group;
      }
    );
  }

  // Add or update a group profile to the current group list(just refresh from backend).
  private updateGroupList(group: Group): Group[] {
    const groups = _.cloneDeep(this._groups);
    let pos = -1;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id === group.id) {
        pos = i;
        break;
      }
    }
    if (pos < 0) {
      groups.push(group);
    } else {
      groups.splice(pos, 1, group);
    }
    return groups;
  }

  getGroupProfileById(id: string | number): Observable<Group> {
    return this.http.get<{ room: Group }>(this.api.groupProfileApi(id)).map((resp) => resp.room);
  }

}
