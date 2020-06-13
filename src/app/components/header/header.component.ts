import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';
import * as Actions from '../auth/store/auth.actions';
import * as recipeActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    public recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      })
    )
      .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onStoreRecipes() {
    // this.recipeService.storeRecipesDb();
    this.store.dispatch(new recipeActions.StoreRecipes());
  }

  onFetchRecipes() {
    /* this.recipeService.fetchRecipes().subscribe(res => {
      console.log(res);
    });*/
    this.store.dispatch(new recipeActions.GetRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new Actions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
