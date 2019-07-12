import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import PostEditorDialog from "./PostEditorDialog";
import { Snackbar } from "@material-ui/core";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      apiRoot: `https://jsonplaceholder.typicode.com`,
      showSnackBar: false,
      snackbarMessage: null,
      showPostEditor: false,
      selectedPost: {}
    };
    this.handlePostEdit = this.handlePostEdit.bind(this);
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
      .get(`${this.state.apiRoot}/posts`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        this.notify("Couldn't fetch the posts. Please try again later");
      });
  }

  handlePostUpdate({ id, title, body }) {
    axios
      .patch(`${this.state.apiRoot}/posts/${id}`, { title, body })
      .then(res => {
        if (res.statusText !== "OK") return;

        const postIndex = this.state.posts.findIndex(p => p.id === id);
        let refreshedPosts = this.state.posts;
        refreshedPosts[postIndex] = { id, title, body };
        this.setState({ posts: refreshedPosts, showPostEditor: false });
        this.notify("Updated the post!");
      })
      .catch(err => {
        this.notify("Couldn't update the post. Please try after sometime");
      });
  }

  handlePostEdit(postId) {
    const selectedPost = this.state.posts.find(p => p.id === postId);
    this.setState({
      showPostEditor: true,
      selectedPost: { title: selectedPost.title, body: selectedPost.body, id: selectedPost.id }
    });
  }

  handlePostDelete(postId) {
    axios
      .delete(`${this.state.apiRoot}/posts/${postId}`)
      .then(res => {
        if (res.statusText !== "OK") return;

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

  componentDidMount() {
    this.getPosts();
  }

  handlePostEditorClose() {
    this.setState({
      showPostEditor: false,
      selectedPost: {}
    });
  }

  render() {
    const postList = this.state.posts.map((p, i) => (
      <Post
        key={i}
        content={p}
        handleEdit={this.handlePostEdit}
        handleDelete={this.handlePostDelete}
      />
    ));
    return (
      <div>
        <div className="posts">{postList}</div>
        <PostEditorDialog
          open={this.state.showPostEditor}
          selectedPost={this.state.selectedPost}
          handlePostUpdate={this.handlePostUpdate}
          handleClose={this.handlePostEditorClose}
          handleSave={this.handlePostUpdate}
        />
        <Snackbar
          message={this.state.snackbarMessage}
          open={this.state.showSnackBar}
          onClose={() => this.setState({ showSnackBar: false })}
          autoHideDuration={2000}
        />
      </div>
    );
  }
}

export default Posts;
