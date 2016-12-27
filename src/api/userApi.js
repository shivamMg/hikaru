import { USERS_URL, displayNetworkError } from './apiHelpers';

class UserApi {
  static createUser(creds) {
    let payload = {
      username: creds.username,
      password: creds.password
    };
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    return fetch(USERS_URL, config).then(response =>
      response.json().then(user =>
        ({ user, response })
      )
    ).catch(displayNetworkError);
  }
}

export default UserApi;
