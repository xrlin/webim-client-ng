import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';

interface User {
  id: number;
  name: string;
}

@Injectable()
export class ContactsService {
  contacts: Observable<User>;

  constructor(private tokenService: TokenService) {

  }
}
