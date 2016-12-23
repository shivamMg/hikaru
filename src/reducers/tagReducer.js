import * as types from '../actions/actionTypes';

export default function tagReducer(state = [], action) {
  switch(action.type) {
    case types.LOAD_TAGS_SUCCESS:
      return action.tags;

    default:
      return state;
  }
}
