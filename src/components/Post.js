import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  card: {
    margin: "20px 0px"
  }
});

function Post(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" align="left">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {props.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleEdit(props.id)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleDelete(props.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Post;
