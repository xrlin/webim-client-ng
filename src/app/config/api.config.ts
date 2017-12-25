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
}
