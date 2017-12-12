import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {fetchPost,deletePost} from '../actions/index';
import {Link} from 'react-router-dom';

class Showinfo extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    console.log(id);
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const {id} = this.props.match.params; //Checks if it matches the id.
    this.props.deletePost(id, () => this.props.history.push('/showinfolists'));
  }

  render() {

    const {post} = this.props;

    if(!post) {
      return <div>loading...</div>
    }

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>SOURCE: <span>{post.source}</span></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>ID: <span>{post.infoId}</span></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>PASSWORD: <span>{post.infoPassword}</span></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>KEY NOTES: <span>{post.keyNotes}</span></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>Image:  <img width="200px" height="200px" alt={post.infoId} src={`data:image/jpeg;base64,${post.fileData}`} /></Col>
          </Row>
        </Grid>
        <div className = "text-xs-right">
        <br/>
        <Link to="/showinfolists" ><button className="btn btn-primary">Back to List</button></Link>
        <Link className="btn btn-primary" to={`/updateinfo/${post.id}`}>
            Update Post
        </Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete Post </button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
      post:state.posts[ownProps.match.params.id],
      image:state.posts.image
  };
}

export default connect(mapStateToProps,{fetchPost,deletePost}) (Showinfo);
