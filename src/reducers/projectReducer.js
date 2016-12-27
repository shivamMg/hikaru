import * as types from '../actions/actionTypes';

export default function projectReducer(state = {
    projects: [],
    errors: {},
    isCreated: false,
    isModified: false,
    isDeleted: false,
    project: {}
  }, action) {

  switch(action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: action.projects
      });
    case types.LOAD_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isModified: false
      });

    case types.CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isCreated: true
      });
    case types.CREATE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isCreated: false
      });

    case types.MODIFY_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isModified: true
      });
    case types.MODIFY_PROJECT_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isModified: false
      });

    case types.DELETE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isDeleted: true
      });
    case types.DELETE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isDeleted: false
      });

    case types.REQUEST_FAILURE:
      return Object.assign({}, state, {
        errors: {},
        isCreated: false,
        isModified: false,
        isDeleted: false
      });

    default:
      return state;
  }
}
