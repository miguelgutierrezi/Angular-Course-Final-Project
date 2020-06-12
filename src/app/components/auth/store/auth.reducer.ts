import {User} from '../../../models/user';
import * as Actions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  isLoading: false
};

export function authReducer(state: State = initialState, action: Actions.AuthActions) {
  switch (action.type) {
    case Actions.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user,
        isLoading: false
      };
    case Actions.LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false
      };
    case Actions.LOGIN_START:
    case Actions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };
    case Actions.AUTH_FAILED:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      };
    case Actions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
