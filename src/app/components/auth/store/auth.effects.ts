import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {AuthResponse} from '../../../models/auth-response';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

const handleAuth = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('user', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email,
    userId,
    token,
    expirationDate
  });
};

const handleError = (err: any) => {
  let errorMessage = 'An unknown error ocurred';
  if (!err.error || !err.error.error) {
    return of(new AuthActions.AuthFailed(errorMessage));
  } else {
    if (err.error.error.message === 'EMAIL_EXISTS') {
      errorMessage = 'The email address is already in use by another account.';
    } else if (err.error.error.message === 'OPERATION_NOT_ALLOWED') {
      errorMessage = 'Password sign-in is disabled for this project.';
    } else if (err.error.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    } else if (err.error.error.message === 'EMAIL_NOT_FOUND' || err.error.error.message === 'INVALID_PASSWORD') {
      errorMessage = 'Invalid user or password';
    } else if (err.error.error.message === 'USER_DISABLED') {
      errorMessage = 'The user account has been disabled by an administrator.';
    }
    return of(new AuthActions.AuthFailed(errorMessage));
  }
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpData: AuthActions.SignupStart) => {
      return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey,
        {
          email: signUpData.payload.email,
          password: signUpData.payload.password,
          returnSecureToken: true
        }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(err => {
          return handleError(err);
        }),
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(err => {
          return handleError(err);
        }),
      );
    }),
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('user');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('user'));

      if (!userData) {
        return {type: 'UNSUCCESSFUL'};
      }
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(new Date(userData._tokenExpirationDate).getTime() + 18000000)
      );

      if (user.token) {
        const expire = new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
        // this.user.next(user);
        this.authService.setLogoutTimer(expire);
        return new AuthActions.AuthSuccess({
          email: user.email,
          userId: user.id,
          token: user.token,
          expirationDate: new Date(new Date(userData._tokenExpirationDate).getTime() + 18000000)
        });
        // const expire = new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expire);
      }
      return {type: 'UNSUCCESSFUL'};
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
