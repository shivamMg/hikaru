import toastr from 'toastr';

let apiBaseUrl;
if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = process.env.API_BASE_URL;
} else {
  apiBaseUrl = 'http://localhost:8000/';
}

const API_BASE_URL = apiBaseUrl;
const AUTH_URL = API_BASE_URL + 'auth/';
const API_URL = API_BASE_URL + 'api/';

export const GET_TOKEN_URL = AUTH_URL + 'get-token/';
export const REFRESH_TOKEN_URL = AUTH_URL + 'refresh-token/';
export const VERIFY_TOKEN_URL = AUTH_URL + 'verify-token/';

export const TAGS_URL = API_URL + 'tags/';
export const PROJECTS_URL = API_URL + 'projects/';
export const USERS_URL = API_URL + 'users/';

export const displayNetworkError = (error) => {
  toastr.error('Network Error');
};
