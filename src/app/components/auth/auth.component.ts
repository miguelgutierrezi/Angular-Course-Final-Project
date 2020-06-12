import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {AuthResponse} from '../../models/auth-response';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as Actions from '../auth/store/auth.actions';
import {Action} from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('userForm') userForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error = null;
  storeSub: Subscription;
  // authObs: Observable<AuthResponse>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
      if (this.error) {
        console.log(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      console.log('Login mode');
      // this.authObs = this.authService.login(email, password);
      this.store.dispatch(
        new Actions.LoginStart({
          email,
          password
        })
      );
    } else {
      console.log('SignUp mode');
      // this.authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        new Actions.SignupStart({
          email,
          password
        })
      );
    }
    /*this.authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, err => {
      this.error = err;
      this.isLoading = false;
    });*/
    this.userForm.reset();
  }

  closeError() {
    this.store.dispatch(new Actions.ClearError());
    // this.error = null;
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
