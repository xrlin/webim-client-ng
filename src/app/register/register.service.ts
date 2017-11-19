import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class RegisterService {
  private registerUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string): Observable<Object> {
    const data = JSON.stringify({user_name: username, password: password});
    return this.http.post(this.registerUrl, data);
  }
}
