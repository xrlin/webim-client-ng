import {Message, MessageService} from './message.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {Group} from '../models/group.models';
import {User} from '../models/user.model';
import {UserService} from './user.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/combineLatest';
import {GroupsService} from './groups.service';

export class Thread {
  lastMessage: Message;
  userID: number;
  groupID: number;
  user: User;
  group: Group;
  ts: ThreadService;

  constructor(threadService: ThreadService, obj: any) {
    this.groupID = obj.groupID;
    this.userID = obj.userID;
    this.lastMessage = obj.lastMessage;
    this.ts = threadService;
  }

  private _profile: User | Group;

  get profile(): User | Group {
    if (this._profile) {
      return this._profile;
    }
    this.ts.threadProfile(this).subscribe((profile: User | Group) => {
      if (this.threadType() === 'p2p') {
        this.user = profile;
      } else {
        this.group = <Group>(profile);
      }
      this._profile = profile;
    }, err => {
      this._profile = <User | Group>{name: '', avatar: ''};
    });
    return this._profile;
  }

  get id(): string {
    const identify = this.userID || this.groupID;
    return `${this.threadType()}-${identify}`;
  }

  get avatar(): string {
    return this.profile && this.profile.avatar;
  }

  get name(): string {
    return this.profile && this.profile.name;
  }

  /**
   * @returns {string} retunr 'p2p' | 'group'
   */
  threadType(): string {
    if (this.userID) {
      return 'p2p';
    }
    return 'group';
  }
}

interface ThreadHash {
  [id: string]: Thread;
}

@Injectable()
export class ThreadService {
  private threadMapSubject: BehaviorSubject<ThreadHash> = new BehaviorSubject<ThreadHash>(<ThreadHash>{});
  private currentThreadSubject: BehaviorSubject<Thread> = new BehaviorSubject<Thread>(new Thread(this, {}));

  constructor(private userService: UserService, private groupService: GroupsService, private messageService: MessageService) {
  }

  get orderedThreads(): Observable<Thread[]> {
    return this.allThreads.map((threadMap: ThreadHash) => {
        const threads = _.values(threadMap);
        return _.sortBy(threads, (thread) => {
          const message = thread.lastMessage || <Message>({sendAt: 1});
          return message.sendAt;
        }).reverse();
      }
    );
  }

  get currentThread(): Observable<Thread> {
    return this.currentThreadSubject;
  }

  // TODO Check thread is p2p or group
  get currentMessages(): Observable<Message[]> {
    return Observable.combineLatest(this.currentThread, this.messageService.messages).map(
      (list) => {
        const thread: Thread = list[0];
        const messages: Message[] = list[1];
        return _.filter(messages, (msg) => msg.from === thread.userID);
      }
    );
  }

  private get allThreads(): Observable<ThreadHash> {
    const currentThreads = this.threadMapSubject.getValue();
    this.messageService.p2pMessages.subscribe((messages: Message[]) => {
      const threadMap: ThreadHash = {};
      for (const msg of messages) {
        const thread = new Thread(this, {userID: msg.from});
        threadMap[thread.id] = threadMap[thread.id] || thread;
        const msgThread: Thread = threadMap[thread.id];
        if (!msgThread.lastMessage || msgThread.lastMessage.sendAt < msg.sendAt) {
          msgThread.lastMessage = msg;
        }
      }
      this.threadMapSubject.next(_.merge(currentThreads, threadMap));
    });
    return this.threadMapSubject;
  }

  setCurrentThread(thread: Thread) {
    this.currentThreadSubject.next(thread);
  }

  /** Create or set the current thread according the params
   * @param {number} id user/group's id
   * @param {string} threadType the type of the thread, available value is 'p2p' | 'group'
   */
  createThread(id: number, threadType: string) {
    const currentThreads = this.threadMapSubject.getValue();
    let newThread: Thread;
    if (threadType === 'p2p') {
      newThread = new Thread(this, {userID: id});
    } else {
      newThread = new Thread(this, {groupID: id});
    }
    const newThreadHash: ThreadHash = {};
    newThreadHash[newThread.id] = newThread;
    this.threadMapSubject.next(_.merge(newThreadHash, currentThreads));
    this.setCurrentThread(newThread);
  }

  threadProfile(thread: Thread): Observable<User | Group> {
    if (thread.threadType() === 'p2p') {
      return this.userService.getProfileById(thread.userID);
    } else {
      return this.groupService.getGroupProfileById(thread.groupID);
    }
  }
}
