const URL = 'http://localhost:8000/api';
const PROJECTS_URL = URL + '/projects/';

class ProjectApi {
  static getProjects() {
    return fetch(PROJECTS_URL).then(response =>
      response.json().then(projects =>
        ({ projects, response })
      )
    );
  }

  static getProject(projectId) {
    return fetch(PROJECTS_URL + projectId + '/').then(response =>
      response.json().then(project =>
        ({ project, response })
      )
    );
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
    );
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
    );
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
    );
  }
}

export default ProjectApi;
