import * as types from '../actions/actionTypes';

export default function projectReducer(state = {
    projects: [],
    errors: {},
    isCreated: false,
    isModified: false,
    isDeleted: false,
    project: {},
    isLoadingForm: false
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

    case types.CREATE_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoadingForm: true
      });
    case types.CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isCreated: true,
        isLoadingForm: false
      });
    case types.CREATE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isCreated: false,
        isLoadingForm: false
      });

    case types.MODIFY_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoadingForm: true
      });
    case types.MODIFY_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.project,
        errors: {},
        isModified: true,
        isLoadingForm: false
      });
    case types.MODIFY_PROJECT_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isModified: false,
        isLoadingForm: false
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
