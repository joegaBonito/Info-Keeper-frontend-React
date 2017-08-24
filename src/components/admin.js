import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchMessage} from '../actions/index';

class Admin extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    const {auth} = this.props;
    if(!auth) {
      return(
        <Redirect to="/signin" />
      );
    }
    return (
      <div>
      Only the authorized user can view this page
        {this.props.message}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    message:state.auth.message
  };
}

export default connect(mapStateToProps,{fetchMessage}) (Admin);
