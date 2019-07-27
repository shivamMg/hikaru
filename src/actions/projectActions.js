
import * as types from './actionTypes';
import projects from '../data/projects';
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
    return dispatch(loadProjectsSuccess(projects));
  };
}
