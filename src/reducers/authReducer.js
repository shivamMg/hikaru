import * as types from '../actions/actionTypes';

export default function auth(state = {
    isFetchingLogin: false,
    isFetchingSignup: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loginErrors: {},
    signupErrors: {},
    showAuthModal: false
  }, action) {

  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingLogin: true,
        isAuthenticated: false,
        user: action.creds
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetchingLogin: false,
        isAuthenticated: true,
        loginErrors: {}
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetchingLogin: false,
        isAuthenticated: false,
        loginErrors: action.errors
      });

    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });

    case types.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetchingSignup: true,
        user: action.creds
      });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSignup: false,
        signupErrors: {}
      });
    case types.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetchingSignup: false,
        signupErrors: action.errors
      });

    case types.AUTH_MODAL_OPEN:
      return Object.assign({}, state, { showAuthModal: true });
    case types.AUTH_MODAL_CLOSE:
      return Object.assign({}, state, {
        loginErrors: {},
        signupErrors: {},
        showAuthModal: false
      });

    default:
      return state;
  }
}
