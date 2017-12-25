import {User} from './user.model';

export interface Room {
  name: string;
  users: User[];
}
