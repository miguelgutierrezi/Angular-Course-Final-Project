import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../components/auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const AppReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
