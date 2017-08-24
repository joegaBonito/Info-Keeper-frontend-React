import React, { Component } from 'react';
import {authError} from '../actions/index';
import {connect} from 'react-redux';

class Index extends Component {
  componentWillMount() {
    this.props.authError();
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Info-Keeper</h1>
        {this.renderAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps,{authError})(Index);
