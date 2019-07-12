import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Container from "@material-ui/core/Container";
import Posts from "./components/Posts";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} App`} >
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="sm">
          <Posts />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
