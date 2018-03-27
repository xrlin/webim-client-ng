import {Thread} from '../core/thread.service';

export class TopicUtil {
  // Return the topic for a thread
  static threadTopic(thread: Thread): string {
    if (thread.threadType() === 'p2p') {
      return `IMS/P2P/${thread.userID}`;
    }
    return `IMS/Group/${thread.groupID}`;
  }
}
