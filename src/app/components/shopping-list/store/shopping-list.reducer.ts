import {Ingredient} from '../../../models/ingredient';
import * as Actions from './shopping-list.actions';
import {ShoppingListActions, STOP_EDIT} from './shopping-list.actions';

export interface State {
  ingredients: Array<Ingredient>;
  editedIngredient: Ingredient;
  editedIngredientId: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Blackberries', 20),
  ],
  editedIngredient: null,
  editedIngredientId: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case Actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case Actions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case Actions.UPDATE_INGREDIENT:
      const ing = state.ingredients[state.editedIngredientId];
      const updatedIng = {
        ...ing,
        ...action.payload
      };
      const updatedIngs = [...state.ingredients];
      updatedIngs[state.editedIngredientId] = updatedIng;
      return {
        ...state,
        ingredients: updatedIngs,
        editedIngredientId: -1,
        editedIngredient: null
      };
    case Actions.DELETE_INGREDIENT:

      return {
        ...state,
        ingredients: state.ingredients.filter((ig, id) => {
          return id !== state.editedIngredientId;
        }),
        editedIngredientId: -1,
        editedIngredient: null
      };
    case Actions.START_EDIT:
      return {
        ...state,
        editedIngredientId: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientId: -1
      };
    default:
      return state;
  }
}
