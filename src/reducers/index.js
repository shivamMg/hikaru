import { combineReducers } from 'redux';
import auth from './authReducer';
import projects from './projectReducer';
import tags from './tagReducer';

const rootReducer = combineReducers({
  auth,
  projects,
  tags
});

export default rootReducer;
