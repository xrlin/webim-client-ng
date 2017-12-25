import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {Observable} from 'rxjs/Observable';
import {Room} from '../models/room.models';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/scan';
import {HttpClient} from '@angular/common/http';

type GroupOperation = (groups: Room[]) => Room[];
const InitGroups: Room[] = [];

interface Resp {
  rooms: Room[];
}

@Injectable()
export class RoomsService {

  rooms: Observable<Room[]>;

  updates: Subject<any> = new Subject<any>();

  retrieve: Subject<any> = new Subject<any>();

  constructor(private api: ApiConfig, private http: HttpClient) {
    this.rooms = this.updates
      .scan((groups: Room[], operation: GroupOperation) => operation(groups), InitGroups)
      .publishReplay(1).refCount();

    this.retrieve.map((groups: Room[]) => (g: Room[]) => groups).subscribe(this.updates);

    this.http.get<Resp>(api.getRoomsApi()).subscribe((resp: Resp) => this.retrieve.next(resp.rooms));
  }


}
