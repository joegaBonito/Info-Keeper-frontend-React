import axios from 'axios';
import {FETCH_POSTS,FETCH_POST,CREATE_POST,UPDATE_POST, DELETE_POST} from './post_types';
import FormData from 'form-data';

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
    let formData = new FormData();
    formData.append('fileData',values.fileData[0]);
    formData.append('source',values.source);
    formData.append('infoId',values.infoId);
    formData.append('infoPassword',values.infoPassword);
    formData.append('keyNotes',values.keyNotes);

    axios.post(`${ROOT_URL}/createinfo`,  formData, {headers:{'Content-Type':'multipart/form-data'}}).then(response=> {
        dispatch({type:CREATE_POST});
        callback();
      }
    );
  };
}

export const updatePost = (id,values,callback) => {
  return function(dispatch) {
    let formData = new FormData();
    formData.append('fileData',values.fileData[0]);
    formData.append('source',values.source);
    formData.append('infoId',values.infoId);
    formData.append('infoPassword',values.infoPassword);
    formData.append('keyNotes',values.keyNotes);
    axios.put(`${ROOT_URL}/updateinfo/${id}`, formData, {headers:{'Content-Type':'multipart/form-data'}}).then(response=>{
      dispatch({type:UPDATE_POST, payload: values});
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
