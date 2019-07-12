import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
            {props.content.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {props.content.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleEdit(props.content.id)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleDelete(props.content.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
