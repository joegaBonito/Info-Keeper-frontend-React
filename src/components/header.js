import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {protectedTest}  from '../actions/index';

class Header extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.protectedTest(()=>this.props.history.push('/showinfolists'))
  }

  renderLinks() {
    if(this.props.authenticated){
      return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="#" onClick={this.handleClick.bind(this)} >Show Info Lists</Link>
        </li>
    ];
    } else {
      return [ <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
    ];
    }
  }

  render() {
    var navbarcss={
      backgroundColor:'#e9ecf0'
    };
    return(
      <nav className="navbar navbar-light" style={navbarcss}>
        <Link to="/" className="navbar-brand">Info-Keeper</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated:state.auth.authenticated
  };
}

export default connect(mapStateToProps, {protectedTest}) (Header);
