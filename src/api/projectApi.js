import { PROJECTS_URL, displayNetworkError } from './apiHelpers';

class ProjectApi {
  static getProjects({ approved }) {
    let projectsUrl = PROJECTS_URL;
    if (typeof approved != 'undefined') {
      // `approved` is either set to true or false
      projectsUrl += '?approved=' + String(approved);
    }

    return fetch(projectsUrl).then(response =>
      response.json().then(projects =>
        ({ projects, response })
      )
    ).catch(displayNetworkError);
  }

  static getProject(projectId) {
    return fetch(PROJECTS_URL + projectId + '/').then(response =>
      response.json().then(project =>
        ({ project, response })
      )
    ).catch(displayNetworkError);
  }

  static createProject(project) {
    // TODO: Verify token before request
    const token = localStorage.getItem('token');
    const payload = Object.assign({}, project);
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(payload)
    };

    return fetch(PROJECTS_URL, config).then(response =>
      response.json().then(project =>
        ({ project, response })
      )
    ).catch(displayNetworkError);
  }

  static modifyProject(project) {
    // TODO: Verify token before request
    const token = localStorage.getItem('token');
    const payload = Object.assign({}, project);
    let config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(payload)
    };

    const url = PROJECTS_URL + project.id + '/';
    return fetch(url, config).then(response =>
      response.json().then(project =>
        ({ project, response })
      )
    ).catch(displayNetworkError);
  }

  static deleteProject(project) {
    // TODO: Verify token before request
    const token = localStorage.getItem('token');
    let config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: ''
    };
    const url = PROJECTS_URL + project.id + '/';

    return fetch(url, config).then(response =>
      ({ project, response })
    ).catch(displayNetworkError);
  }
}

export default ProjectApi;
