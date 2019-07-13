import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {},
  dense: {
    marginTop: 16
  },
  formControl: {
    margin: '10px 0px'
  }
});

class PostEditorDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.selectedPost, open: this.props.open };
    this.changeHandler = this.changeHandler.bind(this);
  }

  static getDerivedStateFromProps(newProps, prevState) {
    // Need to update the state with the props the first time so
    // that the title/Body are loaded
    // There's probably a better way of doing this.
    // TODO: See how it can be made better
    if (!prevState.open && newProps.open) {
      console.log(prevState, newProps)
      return {
        ...newProps.selectedPost,
        open: newProps.open
      }
    }
    return {open: false};
  }

  changeHandler(name) {
    return e => {
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="filled-title">Title</InputLabel>
                <Input
                  id="filled-title"
                  className={classes.textField}
                  value={this.state.title}
                  onChange={this.changeHandler("title")}
                  variant="filled"
                  multiline={true}
                  inputProps={{
                    "aria-label": "Title of the post"
                  }}
                  rows={2}
                  fullWidth
                />
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="filled-body">Body</InputLabel>
                <Input
                  id="filled-body"
                  className={classes.textField}
                  value={this.state.body}
                  onChange={this.changeHandler("body")}
                  variant="filled"
                  multiline={true}
                  inputProps={{
                    "aria-label": "Body of the post"
                  }}
                  rows={4}
                  fullWidth
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.props.handleSave({ ...this.state })}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PostEditorDialog);
