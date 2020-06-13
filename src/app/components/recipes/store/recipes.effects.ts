import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {RecipeService} from '../../../services/recipe.service';
import * as recipesActions from './recipes.actions';
import {Recipe} from '../../../models/recipe';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(recipesActions.GET_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(environment.firebaseEndpoint + 'recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      return new recipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(recipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(environment.firebaseEndpoint + 'recipes.json', recipesState.recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {
  }
}
