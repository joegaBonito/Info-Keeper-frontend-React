import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from  '../actions/index';

class Createinfo extends Component {
   renderField = (field) => {
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  renderFieldTextArea = (field) => {
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <textarea className="form-control" {...field.input} />
        <div className="text-help">
           {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

 renderFieldFileUpload = (field) => {
    return (
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input className="form-control" type="file" {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values,()=>this.props.history.push('/showinfolists'));
  }

  render() {
    const {handleSubmit} = this.props;
    return(
      <div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="Source" name="source" component={this.renderField} />
            <Field label="Id" name="infoId" component={this.renderField} />
            <Field label="Password" name="infoPassword" component={this.renderField} />
            <Field label="Key Notes" name="keyNotes" component={this.renderFieldTextArea}/>
            <Field label="File Upload" name = "fileData" component={this.renderFieldFileUpload} />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/showinfolists" className="btn btn-danger">Cancel</Link>
            </form>
          </div>
    );
  }
}

function validate(values) {
  //console.log(values) -> {title: ' ', categories: 'aasdf', content: 'asdfadf'}
  const errors = {};
  if(!values.source) {
    errors.source="Enter source!";
  }
  if(!values.infoId) {
    errors.infoId="Enter Id!";
  }
  if(!values.infoPassword) {
    errors.infoPassword="Enter Password!";
  }
  if(!values.keyNotes) {
    errors.keyNotes="Enter Key Notes!";
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost}) (Createinfo)
);
