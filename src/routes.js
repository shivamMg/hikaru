import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ProjectsPage from './components/projects/ProjectsPage';
import UnapprovedProjectsPage from './components/projects/UnapprovedProjectsPage';
import CreateProjectPage from './components/projects/CreateProjectPage';
import ModifyProjectPage from './components/projects/ModifyProjectPage';
import NotFoundPage from './components/common/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="projects" component={ProjectsPage} />
    <Route path="projects/unapproved" component={UnapprovedProjectsPage} />
    <Route path="projects/create" component={CreateProjectPage} />
    <Route path="project/:id" component={ModifyProjectPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
