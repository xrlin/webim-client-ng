import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenService} from '../core/token.service';
import {ApiConfig} from '../config/api.config';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: ApiConfig, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === this.api.getTokenApi()) {
      return next.handle(req);
    }
    // Get the auth header from the service.
    const authHeader = TokenService.getToken();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).catch(err => this.handleAuthError(err));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      TokenService.token = '';
      this.router.navigateByUrl('/login');
    }
    return Observable.throw(err);
  }
}
