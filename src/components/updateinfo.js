import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, updatePost} from '../actions/index';

class Updateinfo extends Component {


  componentWillMount() {
    const {id} = this.props.match.params; //Checks if it matches the id
    this.props.fetchPost(id);
  }

  renderField(field) {
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input className="form-control" type="text" placeholder={field.placeholder} {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderFieldTextArea(field) {
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <textarea className="form-control" type="text" placeholder={field.placeholder} {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderFieldFileUpload(field) {
    return (
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input type="file" className="form-control" {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    const {id} = this.props.match.params;
    this.props.updatePost(id,values, () => this.props.history.push('/showinfolists'));
}

  render() {
    const {handleSubmit} = this.props;
    const {post} = this.props;

    if(!post) {
     return <div>Loading...</div>;
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="Source" name="source" placeholder={post.source} component={this.renderField} />
            <Field label="Id" name="infoId" placeholder={post.infoId} component={this.renderField} />
            <Field label="Password" name="infoPassword" placeholder={post.infoPassword} component={this.renderField} />
            <Field label="Key Notes" name="keyNotes" placeholder={post.keyNotes} component={this.renderFieldTextArea} />
            <Field label="File Upload" name ="fileData" component={this.renderFieldFileUpload}  />
          <button type="submit" className="btn btn-primary">Save</button>
          <Link to="/showinfolists" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
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

function mapStateToProps(state, ownProps) {
    return {
      post:state.posts[ownProps.match.params.id]
    }; //the post we want to show
}

export default reduxForm({
  validate,
  form: 'PostsUpdateForm',
})(
  connect(mapStateToProps, {fetchPost, updatePost}) (Updateinfo)
);
