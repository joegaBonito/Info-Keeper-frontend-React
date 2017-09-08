import React, { Component } from 'react';
import {Fields, reduxForm } from 'redux-form';
import {signinUser,authError,errorMsgReset} from '../../actions/index';
import {connect} from 'react-redux';

class Signin extends Component {

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.history.push('/');
    }
    this.props.errorMsgReset();
  }

  handleFormSubmit({username, password }) {
    // Need to do something to log user in
    this.props.signinUser({username, password },()=>this.props.history.push('/'));
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Fields names={['username', 'password']} component={renderFields}/>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
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
    </div>
  );
}
export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, {signinUser,authError,errorMsgReset})(Signin));
