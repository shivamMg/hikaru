const URL = 'http://localhost:8000/auth';
const GET_TOKEN_URL = URL + '/get-token/';
const VERIFY_TOKEN_URL = URL + '/verify-token/';
const REFRESH_TOKEN_URL = URL + '/refresh-token/';
const REGISTER_USER_URL = URL + '/register/';

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
    );
  }

  static registerUser(creds) {
    let payload = {
      username: creds.username,
      password: creds.password
    };
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    return fetch(REGISTER_USER_URL, config).then(response =>
      response.json().then(user =>
        ({ user, response })
      )
    );
  }
}

export default AuthApi;
