import {Action} from '@ngrx/store';
import {AUTH_SUCCESS} from '../../auth/store/auth.actions';
import {Recipe} from '../../../models/recipe';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const GET_RECIPES = '[Recipes] Get Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Array<Recipe>) {
  }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class GetRecipes implements Action {
  readonly type = GET_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {id: number, newRecipe: Recipe}) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export type RecipesActions =
  SetRecipes |
  GetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes;
