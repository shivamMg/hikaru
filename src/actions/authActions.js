import authApi from '../api/authApi';
import * as types from './actionTypes';

function loginRequest(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token
  };
}

function loginFailure(errors) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errors
  };
}

function logoutRequest() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

function signupRequest(creds) {
  return {
    type: types.SIGNUP_REQUEST,
    creds
  };
}

function signupSuccess(user) {
  return {
    type: types.SIGNUP_SUCCESS,
    username: user.username
  };
}

function signupFailure(errors) {
  return {
    type: types.SIGNUP_FAILURE,
    errors
  };
}

export function loginUser(creds) {
  return function(dispatch) {
    dispatch(loginRequest(creds));

    return authApi.getToken(creds).then(({ user, response }) => {
      if (!response.ok) {
        const errors = user;
        return dispatch(loginFailure(errors));
      } else {
        localStorage.setItem('token', user.token);
        return dispatch(loginSuccess(user));
      }
    }).catch(error => {
      throw(error);
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
  /* Also logs in if user registered successfully */
  return function(dispatch) {
    dispatch(signupRequest(creds));

    return authApi.registerUser(creds).then(({ user, response }) => {
      if (!response.ok) {
        const errors = user;
        return dispatch(signupFailure(errors));
      } else {
        dispatch(signupSuccess(user));
        // Log user in
        return dispatch(loginUser(creds));
      }
    }).catch(error => {
      throw(error);
    });
  };
}
