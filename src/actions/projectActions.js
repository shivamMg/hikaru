
import * as types from './actionTypes';
import projects from '../data/projects';
import { tagList } from '../components/projects/helpers';

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
    return tagList();
  };
}

export function loadProjects({ approved }) {
  return function(dispatch) {
    return dispatch(loadProjectsSuccess(projects));
  };
}
