import { knuthShuffle } from 'knuth-shuffle';
import { displayLoginAgain, displayRequestError, requestFailure } from './actionHelpers';
import * as types from './actionTypes';
import { logoutUser, openAuthModal } from './authActions';
import authApi from '../api/authApi';
import projectApi from '../api/projectApi';
import tagApi from '../api/tagApi';

export function loadTagsSuccess(tags) {
  return { type: types.LOAD_TAGS_SUCCESS, tags };
}

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function loadProjectSuccess(project) {
  return { type: types.LOAD_PROJECT_SUCCESS, project };
}

export function createProjectSuccess(project) {
  return { type: types.CREATE_PROJECT_SUCCESS, project };
}

export function createProjectFailure(errors) {
  return { type: types.CREATE_PROJECT_FAILURE, errors };
}

export function modifyProjectSuccess(project) {
  return { type: types.MODIFY_PROJECT_SUCCESS, project };
}

export function modifyProjectFailure(errors) {
  return { type: types.MODIFY_PROJECT_FAILURE, errors };
}

export function deleteProjectSuccess(project) {
  return { type: types.DELETE_PROJECT_SUCCESS, project };
}

export function deleteProjectFailure(errors) {
  return { type: types.DELETE_PROJECT_FAILURE, errors };
}


export function loadTags() {
  return function(dispatch) {
    return tagApi.getTags().then(({ tags, response }) => {
      if (response.ok) {
        return dispatch(loadTagsSuccess(tags));
      } else {
        displayRequestError();
        return dispatch(requestFailure());
      }
    });
  };
}

export function loadProjects({ approved }) {
  return function(dispatch) {
    return projectApi.getProjects({ approved }).then(({ projects, response }) => {
      if (response.ok) {
        /* Shuffle projects */
        const randProjects = knuthShuffle(projects);
        return dispatch(loadProjectsSuccess(randProjects));
      } else {
        displayRequestError();
        return dispatch(requestFailure());
      }
    });
  };
}

export function loadProject(projectId) {
  return function(dispatch) {
    return projectApi.getProject(projectId).then(({ project, response }) => {
      if (response.ok) {
        return dispatch(loadProjectSuccess(project));
      } else {
        displayRequestError();
        return dispatch(requestFailure());
      }
    });
  };
}

export function createProject(project) {
  return function (dispatch, getState) {
    /* Verify token before creating project */
    return authApi.verifyToken().then(({ response }) => {
      if (!response.ok) {
        /* Invalid token */
        dispatch(logoutUser());
        displayLoginAgain();
        return dispatch(openAuthModal());
      } else {
        return projectApi.createProject(project).then(({ project, response }) => {
          if (!response.ok) {
            if (response.status === 400) {
              /* Send validation errors to form */
              const errors = project;
              return dispatch(createProjectFailure(errors));
            } else {
              displayRequestError();
              return dispatch(requestFailure());
            }
          } else {
            return dispatch(createProjectSuccess(project));
          }
        });
      }
    });
  };
}

export function modifyProject(project) {
  return function (dispatch, getState) {
    /* Verify token before modifying project */
    return authApi.verifyToken().then(({ response }) => {
      if (!response.ok) {
        /* Invalid token */
        dispatch(logoutUser());
        displayLoginAgain();
        return dispatch(openAuthModal());
      } else {
        return projectApi.modifyProject(project).then(({ project, response }) => {
          if (!response.ok) {
            if (response.status === 400) {
              /* Send validation errors to form */
              const errors = project;
              return dispatch(modifyProjectFailure(errors));
            } else {
              displayRequestError();
              return dispatch(requestFailure());
            }
          } else {
            return dispatch(modifyProjectSuccess(project));
          }
        });
      }
    });
  };
}

export function deleteProject(project) {
  return function (dispatch, getState) {
    /* Verify token before deleting project */
    return authApi.verifyToken().then(({ response }) => {
      if (!response.ok) {
        /* Invalid token */
        dispatch(logoutUser());
        displayLoginAgain();
        return dispatch(openAuthModal());
      } else {
        return projectApi.deleteProject(project).then(({ project, response }) => {
          if (!response.ok) {
            displayRequestError();
            return dispatch(requestFailure());
            // const errors = project;
            // return dispatch(deleteProjectFailure(errors));
          } else {
            return dispatch(deleteProjectSuccess(project));
          }
        });
      }
    });
  };
}
