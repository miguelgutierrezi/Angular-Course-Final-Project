import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as Actions from './components/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular-Course';

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new Actions.AutoLogin());
    // this.authService.autoLogin();
  }
}
