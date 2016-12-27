import { GET_TOKEN_URL, REFRESH_TOKEN_URL, VERIFY_TOKEN_URL, displayNetworkError } from './apiHelpers';

// TODO: Implement Token refresh and verification

class AuthApi {
  static getToken(creds) {
    let payload = {
      username: creds.username,
      password: creds.password
    };
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    return fetch(GET_TOKEN_URL, config).then(response =>
      response.json().then(user =>
        ({ user, response })
      )
    ).catch(displayNetworkError);
  }
}

export default AuthApi;
