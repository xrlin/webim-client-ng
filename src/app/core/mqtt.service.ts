import {Injectable} from '@angular/core';
import {connect, MqttClient} from 'mqtt';
import {UserService} from './user.service';
import {User} from '../models/user.model';

@Injectable()
export class MqttService {
  private clientObj;

  constructor(private userService: UserService) {
    this.clientObj = connect('mqtt://localhost:1883');
    this.clientObj.on('connect', () => {
      this.userService.currentUser.subscribe((user: User) => {
        this.clientObj.subscribe(`IMS/P2P/#`);
        this.clientObj.publish(`IMS/P2P/${user.id}`, '{"from":82,"payload":"Hello","sendAt":1517108319}');
      });
    });
  }

  get client(): MqttClient {
    return this.clientObj;
  }
}
