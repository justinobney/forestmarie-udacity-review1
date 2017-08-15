import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import BooksContainer from "./BooksContainer";
import MainContainer from "./MainContainer";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={MainContainer} />
        <Route exact path="/search" component={BooksContainer} />
      </div>
    );
  }
}

export default App;
