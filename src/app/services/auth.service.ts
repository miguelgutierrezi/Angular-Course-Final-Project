import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse} from '../models/auth-response';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private timer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  private handleAuth(email: string, localId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const userToStore = new User(email, localId, token, expirationDate);
    this.user.next(userToStore);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(userToStore));
  }

  private handleErrors(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
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
      return throwError(errorMessage);
    }
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    } else {
      this.user.next(userData);
      const expire = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expire);
    }
  }

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoNqGHPzWUYS1uuTGxxUs5FyKhnjKiFKM',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleErrors),
      tap(res => {
        this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoNqGHPzWUYS1uuTGxxUs5FyKhnjKiFKM',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleErrors),
      tap(res => {
        this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}