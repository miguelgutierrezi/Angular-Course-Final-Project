import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/auth-response';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('userForm') userForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponse>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
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
      this.authObs = this.authService.login(email, password);
    } else {
      console.log('SignUp mode');
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, err => {
      this.error = err;
      this.isLoading = false;
    });
    this.userForm.reset();
  }

  closeError() {
    this.error = null;
  }
}
