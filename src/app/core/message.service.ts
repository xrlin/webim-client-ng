import {Injectable} from '@angular/core';
import {MqttService} from './mqtt.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../config/api.config';

export class Message {
  topic: string;
  uuid: string;
  from: number; // id of user who send this message
  payload: string;
  sendAt: number;
  private userService: UserService;

  constructor(userService: UserService, obj: any) {
    this.userService = userService;
    this.from = obj.from;
    this.uuid = obj.uuid;
    this.payload = obj.payload;
    this.sendAt = obj.sendAt;
    this.topic = obj.topic;
    if (this.from) {
      userService.getProfileById(this.from).subscribe((user) => this._user = user);
    }
  }

  _user: User;

  get user(): User {
    if (!this._user) {
      this.userService.getProfileById(this.from).subscribe((u) => this._user = u);
    }
    return this._user;
  }
}

const GroupTopicRule = 'IMS/Group/';
const P2PTopicRule = 'IMS/P2P/';

@Injectable()
export class MessageService {
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  constructor(private mqttService: MqttService, private userService: UserService, private http: HttpClient, private api: ApiConfig) {
    mqttService.client.on('message', (topic: string, bytes: Uint8Array) => {
      const message = new Message(userService, JSON.parse(bytes.toString()));
      message.topic = topic;
      this._messages = _.uniqBy(_.concat(this._messages, message), 'uuid');
      this.messageSubject.next(this._messages);
    });
  }

  private _messages: Message[] = [];

  get messages(): Observable<Message[]> {
    return this.messageSubject;
  }

  get groupMessages(): Observable<Message[]> {
    return this.messageSubject.map((messages) => {
      return _.filter(messages, (message) => message.topic.startsWith(GroupTopicRule));
    });
  }

  get p2pMessages(): Observable<Message[]> {
    return this.messageSubject.map((messages) => {
      return _.filter(messages, (message) => message.topic.startsWith(P2PTopicRule));
    });
  }

  send(message: Message): Observable<any> {
    const data = JSON.stringify(message, ['from', 'topic', 'payload', 'uuid']);
    return this.http.post(this.api.sendMessageApi(), data);
  }
}
