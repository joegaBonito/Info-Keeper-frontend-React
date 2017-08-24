import {FETCH_POSTS,FETCH_POST, UPDATE_POST, DELETE_POST} from '../actions/post_types';
import _ from 'lodash';

export default function(state={},action) {
  switch(action.type) {
    case DELETE_POST:
      return _.omit(state,action.payload);
    case FETCH_POST:
      return {...state, [action.payload.data.id]:action.payload.data};
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case UPDATE_POST:
      return {...state, [action.payload.id]:action.payload};
    default:
      return state;
  }
}
