/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { loadProjects, loadTags } from './actions/projectActions';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import './styles/main.css';
import './images/favicon.png';

const store = configureStore();
store.dispatch(loadProjects({ approved: true }));
store.dispatch(loadTags());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
