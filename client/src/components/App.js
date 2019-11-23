import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './Home'
import Certification from './Certification'
import IssuePage from './IssuePage'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/certification/sample/:bride/:groom/" component={Certification}/>
          <Route path="/certification/:id/:txHash" component={Certification}/>
          <Route path="/issue/:bride/:groom/" component={IssuePage}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
