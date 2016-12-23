import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import ProjectsPage from './components/projects/ProjectsPage';
import CreateProjectPage from './components/projects/CreateProjectPage';
import ModifyProjectPage from './components/projects/ModifyProjectPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="projects" component={ProjectsPage} />
    <Route path="projects/create" component={CreateProjectPage} />
    <Route path="project/:id" component={ModifyProjectPage} />
  </Route>
);
