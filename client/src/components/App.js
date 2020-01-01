import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from './Home'
import Certificate from './Certificate'
import IssuePage from './IssuePage'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/certificate/sample/:bride/:groom/" component={Certificate}/>
          <Route path="/certificate/:id/:txHash" component={Certificate}/>
          <Route path="/issue/:bride/:groom/" component={IssuePage}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App
