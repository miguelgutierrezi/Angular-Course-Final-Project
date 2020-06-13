import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {RecipeService} from './recipe.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as recipesActions from '../components/recipes/store/recipes.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    /* const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.recipeService.fetchRecipes();
    } else {
      return recipes;
    }*/
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new recipesActions.GetRecipes());
          return this.actions$.pipe(
            ofType(recipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
