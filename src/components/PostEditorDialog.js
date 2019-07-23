import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {},
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

  componentWillReceiveProps(newProps) {
    this.setState({
      open: newProps.open,
      ...newProps.selectedPost
    });
  };

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
      <Dialog maxWidth="sm" open={this.props.open} onClose={this.props.handleClose}>
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
                aria-describedby="Input field to edit the title of the post"
                rows={2}
                fullWidth
                inputProps={ {maxLength: 90} }
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
                aria-describedby="Input field to edit the body of the post"
                rows={4}
                fullWidth
                inputProps={ {maxLength: 200} }
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
    );
  }
}

PostEditorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default withStyles(styles)(PostEditorDialog);
