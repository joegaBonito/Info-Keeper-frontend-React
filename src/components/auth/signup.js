import React, { Component } from 'react';
import {Fields, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {signupUser,authError,errorMsgReset} from '../../actions/index';

class SignUp extends Component {
  componentWillMount() {
    if(this.props.authenticated) {
      this.props.history.push('/');
    }
    this.props.errorMsgReset();
  }

  handleFormSubmit(formProps) {
    //Call action creator to sign up the user!
    this.props.signupUser(formProps,()=>this.props.history.push('/'));
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit} = this.props;

    return (
      <div>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Fields names={['username','password','confirmpassword']} component={renderFields}/>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if(!formProps.password) {
    errors.password = 'Please enter password';
  }

  if(!formProps.confirmpassword) {
    errors.confirmpassword = 'Please confirm password';
  }

  if(formProps.password !== formProps.confirmpassword) {
    errors.password = 'Passwords must match!';
  }

  return errors;
}

const renderFields = (fields) => {
  var errorcolor = {
    color:'red'
  };
  return (
    <div>
  <fieldset className="form-group">
    <label>Email:</label>
    <input {...fields.username.input} className="form-control" />
    {fields.username.meta.touched && fields.username.meta.error && <div className="error" style={errorcolor}>{fields.username.meta.error}</div>}
  </fieldset>
  <fieldset className="form-group">
    <label>Password:</label>
    <input {...fields.password.input} type="password" className="form-control" />
    {fields.password.meta.touched && fields.password.meta.error && <div className="error" style={errorcolor}>{fields.password.meta.error}</div>}
  </fieldset>
  <fieldset className="form-group">
    <label>Confirm Password:</label>
    <input {...fields.confirmpassword.input} type="password" className="form-control" />
    {fields.confirmpassword.meta.touched && fields.confirmpassword.meta.error && <div className="error" style={errorcolor}>{fields.confirmpassword.meta.error}</div>}
  </fieldset>
  </div>
  );
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default reduxForm({
  validate,
  form: 'signup',
})(connect(mapStateToProps, {signupUser,authError,errorMsgReset})(SignUp));
