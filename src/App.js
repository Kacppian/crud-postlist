import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Container from "@material-ui/core/Container";
import Posts from "./containers/Posts";
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
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="sm">
          <Posts />
        </Container>
    </div>
  );
}

export default App;
