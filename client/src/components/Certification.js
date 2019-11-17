import React, { Component } from "react";
import { Link } from "react-router-dom";
import { redirectRoot } from "../utils/common";

class Certification extends Component {

  componentDidMount = () => redirectRoot(!this.props.crtif.bride || !this.props.crtif.groom)

  render() {
    return (
      <div>
        <h2>Certification</h2>
        <p>{this.props.crtif.bride}</p>
        <p>{this.props.crtif.groom}</p>
        <Link to="/issue">Confirmed</Link>
      </div>
    )
  }
}

export default Certification;
