import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Certification from './Certification'
import IssuePage from './IssuePage'
import { toHex } from "../utils/hex";

class App extends Component {
  state = {
    bride: null,
    groom: null,  
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/certification">
            <Certification crtif={this.state}/>
          </Route>
          <Route path="/issue">
            <IssuePage crtif={this.state}/>
          </Route>
          <Route path="/">
            <Home value={this.state} onChange={(e) => this.handleChange(e)}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

class Home extends Component {
  state = {
    brideValiMsg: null,
    groomValiMsg: null,
    canIssue: 'disabled',
  }

  handleChange(e) {
    if (toHex(e.target.value).length > 64) {
      return this.setState({[`${e.target.name}ValiMsg`]: 'Wrong'})
    }

    this.setState({[`${e.target.name}ValiMsg`]: 'OK'})
    this.props.onChange(e)
  }

  render() {
    let canIssue = this.state.brideValiMsg === 'OK' && this.state.groomValiMsg === 'OK'

    return (
      <div>
        <h2>Home</h2>
        <input type="text" name="bride" value={this.props.bride} onChange={(e) => this.handleChange(e)}/>
        <p>{this.state.brideValiMsg}</p>
        <input type="text" name="groom" value={this.props.bride} onChange={(e) => this.handleChange(e)}/>
        <p>{this.state.groomValiMsg}</p>
        <Link className={canIssue ? 'activate' : 'disable'} to='/certification'>Certification Issue</Link>
      </div>
    )
  }
}

export default App;
