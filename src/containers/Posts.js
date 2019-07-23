import React, { Component } from "react";
import axios from "axios";
import Post from "../components/Post";
import PostEditorDialog from "../components/PostEditorDialog";
import { Snackbar } from "@material-ui/core";
import constants from "../helpers/constants";
import debounce from 'lodash.debounce'

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showSnackBar: false,
      snackbarMessage: null,
      showPostEditor: false,
      selectedPost: {}
    };

    this.handlePostEditorOpen = this.handlePostEditorOpen.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostEditorClose = this.handlePostEditorClose.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
  }

  notify(message) {
    this.setState({
      showSnackBar: true,
      snackbarMessage: message
    });
  }

  getPosts() {
    axios
      .get(`${constants.POSTS_API}/posts`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        this.notify("Couldn't fetch the posts. Please try again later");
      });
  }

  handlePostUpdate({ id, title, body }) {
    axios
      .patch(`${constants.POSTS_API}/posts/${id}`, { title, body })
      .then(res => {
        if (res.status !== 200) throw new Error();

        const postIndex = this.state.posts.findIndex(p => p.id === id);
        let refreshedPosts = this.state.posts;
        refreshedPosts[postIndex] = res.data;
        this.setState({ posts: refreshedPosts, showPostEditor: false });
        this.notify("Updated the post!");
      })
      .catch(err => {
        this.notify("Couldn't update the post. Please try after sometime");
      });
  }

  handlePostDelete(postId) {
    axios
      .delete(`${constants.POSTS_API}/posts/${postId}`)
      .then(res => {
        if (res.status !== 200) throw new Error();

        const postIndex = this.state.posts.findIndex(p => p.id === postId);
        let refreshedPosts = this.state.posts;
        refreshedPosts.splice(postIndex, 1);
        this.setState({ posts: refreshedPosts });
        this.notify("Deleted the post");
      })
      .catch(err => {
        this.notify(
          "Couldn't delete the post. Please try again after sometime"
        );
      });
  }

  handlePostEditorOpen(postId) {
    const selectedPost = this.state.posts.find(p => p.id === postId);
    this.setState({
      showPostEditor: true,
      selectedPost: { title: selectedPost.title, body: selectedPost.body, id: selectedPost.id }
    });
  }

  handlePostEditorClose() {
    this.setState({
      showPostEditor: false,
      selectedPost: {}
    });
  }

  componentWillMount() {
    this.getPosts();
  }

  render() {
    const postList = this.state.posts.map(p => (
      <Post
        key={p.id}
        id={p.id}
        title={p.title}
        body={p.body}
        handleEdit={this.handlePostEditorOpen}
        handleDelete={debounce(this.handlePostDelete, constants.WAIT_TIME)}
      />
    ));
    return (
      <React.Fragment>
        <div className="posts">{postList}</div>
        <PostEditorDialog
          open={this.state.showPostEditor}
          selectedPost={this.state.selectedPost}
          handleClose={this.handlePostEditorClose}
          handleSave={debounce(this.handlePostUpdate, constants.WAIT_TIME)}
        />
        <Snackbar
          message={this.state.snackbarMessage}
          open={this.state.showSnackBar}
          onClose={() => this.setState({ showSnackBar: false })}
          autoHideDuration={2000}
        />
      </React.Fragment>
    );
  }
}

export default Posts;
