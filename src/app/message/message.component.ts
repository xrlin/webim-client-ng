import {Component, Input, OnDestroy} from '@angular/core';
import {Message} from '../core/message.service';
import {UserService} from '../core/user.service';
import {User} from '../models/user.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnDestroy {
  @Input() message: Message;
  private currentUser: User;
  private subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
