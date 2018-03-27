import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Thread, ThreadService} from '../core/thread.service';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../core/user.service';
import {Message, MessageService} from '../core/message.service';
import {TopicUtil} from '../shared/topic.util';
import {User} from '../models/user.model';
import {CommonUtil} from '../shared/common.util';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-messages-content',
  templateUrl: './messages-content.component.html',
  styleUrls: ['./messages-content.component.scss'],
})
export class MessagesContentComponent implements OnInit, OnDestroy, AfterViewInit {
  messages: Message[] = [];
  threads: Thread[] = [];
  subscriptions: Subscription = new Subscription();
  currentThread: Thread = new Thread(this.threadService, {});
  @ViewChildren(PerfectScrollbarDirective) scrollbars: QueryList<PerfectScrollbarDirective>;
  scrollbar: PerfectScrollbarDirective;

  constructor(private threadService: ThreadService, private userService: UserService, private messageService: MessageService) {
    this.subscriptions.add(threadService.orderedThreads.subscribe((threads) => this.threads = threads));
    this.subscriptions.add(threadService.currentThread.subscribe((thread) => this.currentThread = thread));
    this.subscriptions.add(threadService.currentMessages.subscribe((messages) => {
      this.messages = messages;
      if (this.scrollbar) {
        setTimeout(() => this.scrollbar.scrollToBottom(), 200);
      }
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setCurrentThread(thread: Thread) {
    this.threadService.setCurrentThread(thread);
  }

  send(payload: string) {
    const thread = this.currentThread;
    let from = 0;
    this.userService.currentUser.subscribe((u: User) => from = u.id);
    const msg: Message = new Message(this.userService, {
      payload,
      topic: TopicUtil.threadTopic(thread),
      from: from,
      uuid: CommonUtil.generateUUID()
    });
    this.messageService.send(msg).subscribe();
  }

  ngAfterViewInit() {
    this.scrollbar = this.scrollbars.toArray()[1];
  }
}
