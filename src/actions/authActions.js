import { displayRequestError, requestFailure } from './actionHelpers';
import * as types from './actionTypes';
import authApi from '../api/authApi';
import userApi from '../api/userApi';

function loginRequest(creds) {
  return { type: types.LOGIN_REQUEST, creds };
}

function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, token: user.token };
}

function loginFailure(errors) {
  return { type: types.LOGIN_FAILURE, errors };
}

function logoutRequest() {
  return { type: types.LOGOUT_REQUEST };
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}

function signupRequest(creds) {
  return { type: types.SIGNUP_REQUEST, creds };
}

function signupSuccess(user) {
  return { type: types.SIGNUP_SUCCESS, username: user.username };
}

function signupFailure(errors) {
  return { type: types.SIGNUP_FAILURE, errors };
}

function openAuthModalAction() {
  return { type: types.AUTH_MODAL_OPEN };
}

function closeAuthModalAction() {
  return { type: types.AUTH_MODAL_CLOSE };
}

export function openAuthModal() {
  return function(dispatch) {
    return dispatch(openAuthModalAction());
  };
}

export function closeAuthModal() {
  return function(dispatch) {
    return dispatch(closeAuthModalAction());
  };
}

export function loginUser(creds) {
  return function(dispatch) {
    dispatch(loginRequest(creds));

    return authApi.getToken(creds).then(({ user, response }) => {
      if (!response.ok) {
        if (response.status === 400) {
          /* Send validation errors to form */
          const errors = user;
          return dispatch(loginFailure(errors));
        } else {
          displayRequestError();
          return dispatch(requestFailure());
        }
      } else {
        localStorage.setItem('token', user.token);
        dispatch(closeAuthModalAction());
        return dispatch(loginSuccess(user));
      }
    });
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
}

export function signupUser(creds) {
  /* Also logs in if user was created successfully */
  return function(dispatch) {
    dispatch(signupRequest(creds));

    return userApi.createUser(creds).then(({ user, response }) => {
      if (!response.ok) {
        if (response.status === 400) {
          /* Send validation errors to form */
          const errors = user;
          return dispatch(signupFailure(errors));
        } else {
          displayRequestError();
          return dispatch(requestFailure());
        }
      } else {
        dispatch(signupSuccess(user));
        // Log user in
        return dispatch(loginUser(creds));
      }
    });
  };
}
