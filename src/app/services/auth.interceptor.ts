import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {User} from '../models/user';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone(
          {
            params: new HttpParams().set('auth', user.token)
          });
        return next.handle(modifiedReq);
      })
    );
  }
}
