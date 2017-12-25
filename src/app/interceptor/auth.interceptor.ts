import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenService} from '../core/token.service';
import {ApiConfig} from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: ApiConfig) {
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
    return next.handle(authReq);
  }
}
