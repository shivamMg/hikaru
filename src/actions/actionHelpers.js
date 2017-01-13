import toastr from 'toastr';
import * as types from './actionTypes';

export const displayRequestError = () => {
  toastr.error('Something went wrong');
};

export const displayLoginAgain = () => {
  toastr.warning('Please login again');
};

export function requestFailure() {
  return { type: types.REQUEST_FAILURE };
}
