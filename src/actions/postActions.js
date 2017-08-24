import axios from 'axios';
import {FETCH_POSTS,FETCH_POST,CREATE_POST,UPDATE_POST, DELETE_POST} from './post_types';

const ROOT_URL = 'http://localhost:3175';

export const fetchPost = (id) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/showinfo/${id}`).then( response => {
        dispatch({type:FETCH_POST, payload:response})
      }
    );
  };
}

export const fetchPosts = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/showinfolists`).then( response => {
      dispatch({type:FETCH_POSTS, payload:response})
      }
    );
  };
}

export const createPost = (values,callback) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/createinfo`, values).then(response=> {
      dispatch({type:CREATE_POST})
      callback();
    }
    );
  };
}

export const updatePost = (id,values,callback) => {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/updateinfo/${id}`, values).then(response=>{
      dispatch({type:UPDATE_POST, payload: values})
      callback();
    });
  }
}

export const deletePost = (id,callback) => {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/delete/${id}`).then(response=> {
      callback();
      dispatch({type:DELETE_POST,payload: id})
    })
  }
}
