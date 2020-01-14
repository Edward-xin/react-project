import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home";
import Login from "./containers/login";
import BasicLyout from "./components/basic-layout";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          {/* exact 全匹配 否则会命中两个地址 */}
          <BasicLyout>
            <Route path="/" exact component={Home} />
          </BasicLyout>
        </Switch>
      </Router>
    );
  }
}
