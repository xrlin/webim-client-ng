import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export interface SystemNotification {
  message: string;
  status: string; // 'success'|'error'
}

@Injectable()
export class NotificationService {

  notification: Subject<SystemNotification>;

  constructor() {
    this.notification = new Subject<SystemNotification>();
  }

  /**
   * @param {string} message
   * @param {string} status 'success'|'error'
   */
  addNotification(message: string, status: string) {
    const msg = {message, status};
    this.notification.next(msg);
  }
}
