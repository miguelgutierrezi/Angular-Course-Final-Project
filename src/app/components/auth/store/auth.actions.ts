import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTH_FAILED = '[Auth] Login Failed';
export const AUTH_SUCCESS = '[Auth] Login';
export const SIGNUP_START = '[Auth] Signup Start';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date,
    redirect: boolean
  }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
}

export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;

  constructor(public payload: string) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}

export type AuthActions =
  AuthSuccess |
  Logout |
  LoginStart |
  AuthFailed |
  SignupStart |
  ClearError |
  AutoLogin |
  AutoLogout;
