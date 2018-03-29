import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE,PROTECTED_TEST,ERROR_MSG_RESET} from '../actions/auth_types';

export default function(state = {}, action){
  switch(action.type) {
    case FETCH_MESSAGE:
      return {...state, message: action.payload};
    case AUTH_USER:
      return {...state, error: '', authenticated: true};
    case UNAUTH_USER:
      return {...state, authenticated: false};
    case AUTH_ERROR:
      return {...state, error:action.payload};
    case PROTECTED_TEST:
      return {...state, role: action.payload};
    case ERROR_MSG_RESET:
      return {...state, error: action.payload};
    default: 
      return state;
  }
}
