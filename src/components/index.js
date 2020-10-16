/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import List from "./List";
import Short from "./Short";

const Components = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/list" component={List} exact />
        <Route path="/:shorturl" component={Short} />
      </Switch>
    </Router>
  );
};

export default Components;
