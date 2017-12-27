import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/throw';
import {ApiConfig} from '../config/api.config';
import {Router} from '@angular/router';

interface TokenData {
  token: string;
}

@Injectable()
export class TokenService {
  private authUrl: string;

  constructor(private http: HttpClient, private api: ApiConfig, private router: Router) {
    this.authUrl = api.getTokenApi();
  }

  private static set token(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  static getToken(): string {
    return window.sessionStorage.getItem('token');
  }

  auth(username: string, password: string): Observable<String | HttpErrorResponse> {
    const data: String = JSON.stringify({user_name: username, password: password});
    return this.http.post<TokenData>(this.authUrl, data).map(
      (resp: TokenData) => TokenService.token = resp.token
    );
  }

  logout() {
    TokenService.token = '';
    this.router.navigate(['/login']);
  }
}
