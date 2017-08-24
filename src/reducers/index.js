import { combineReducers } from 'redux';
import {reducer as FormReducer} from 'redux-form';
import PostsReducer from './reducer_posts';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: FormReducer,
  posts: PostsReducer,
  auth: AuthReducer
});

export default rootReducer;
