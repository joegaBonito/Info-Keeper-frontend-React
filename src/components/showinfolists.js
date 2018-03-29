import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router-dom';


class ShowinfoLists extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    if(_.size(this.props.posts) === 0) {
      return <div> There is no post. </div>;
    }
    return _.map(this.props.posts, post => {
      return(
        <li className="list-group-item" key={post.id}>
          <Link to={"/showinfo/"+post.id}> { post.source} </Link>
        </li>
      );
    });
  }
  render() {

    return (
      <div>
      {/* <h3>Info-Keeper List</h3> */}
          <ul className="list-group">
            { this.renderPosts() }
          </ul>
          <Link to="/createinfo" ><button className="btn btn-primary">Create new Post</button></Link>
      </div>
    );
  }
}

function mapStateToProps({posts}){
  return {
    posts: posts
  };
}

export default connect(mapStateToProps,{fetchPosts}) (ShowinfoLists);
