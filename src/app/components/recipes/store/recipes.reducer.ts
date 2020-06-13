import {Recipe} from '../../../models/recipe';
import * as Actions from './recipes.actions';
import {act} from '@ngrx/effects';

export interface State {
  recipes: Array<Recipe>;
}

const initialState = {
  recipes: []
};

export function recipesReducer(state: State = initialState, action: Actions.RecipesActions) {
  switch (action.type) {
    case Actions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case Actions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case Actions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.id];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.id] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case Actions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, id) => {
          return id !== action.payload;
        })
      };
    default:
      return state;
  }
}
