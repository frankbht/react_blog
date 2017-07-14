import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends React.Component {
  componentDidMount() {
    if(!this.props.post) {
      const id = this.props.match.params.id;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  // helperFunction() {
  //   this.props.posts[this.props.match.params.id];
  // }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }
    // this.props === ownProps
    // posts = posts[this.props.match.params.id];
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <h3>{post.title}</h3>
        <h6>Tags: {post.tags}</h6>
        <p>{post.content}</p>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >Delete</button>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
