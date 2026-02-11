import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE
  };
}

export function loginLogout() {
  return {
    type: types.LOGIN_LOGOUT
  };
}
