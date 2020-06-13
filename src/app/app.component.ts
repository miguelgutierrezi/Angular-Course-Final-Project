import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as Actions from './components/auth/store/auth.actions';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular-Course';

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.store.dispatch(new Actions.AutoLogin());
    }
    // this.authService.autoLogin();
  }
}
