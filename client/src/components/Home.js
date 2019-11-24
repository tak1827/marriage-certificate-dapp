import React, { Component } from "react"

import { Link } from "react-router-dom"
import { toHex } from "../utils/hex"

import IconImg from "../images/icon.png"

class Home extends Component {
  state = {
    bride: '',
    groom: '',
  }

  handleChange = (e) => this.setState({[e.target.name]: toHex(e.target.value)})

  validation = (value) => 1 <= value.length && value.length <= 64

  render() {
    let bride = this.state.bride
    let groom = this.state.groom
    let canIssue = this.validation(bride) && this.validation(groom)

    return (
      <div className="container ribbon14-wrapper">
        <span className="ribbon14">♡</span>
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src={IconImg} alt="" width="72" height="72"/>
          <h1 className="text-white">Marriage certification on Blockchain</h1>
          <p className="lead text-white">Blockchain prove your marriage forever even you go. Issue marriage certification for everybody even sexual minorities.</p>
        </div>
        <form className="form-signin">
          <div className="text-center mb-4">
            <p className="lead text-white">Please tell us <code className="p-1 bg-light">your name</code> and <br/><code className="p-1 bg-light">your partner's name</code>. We are going to show you a sample certification.</p>
          </div>

          <div className="form-label-group mb-2">
            <input type="text" name="bride" placeholder="Your Name" required
              onChange={(e) => this.handleChange(e)} 
              className={this.validation(bride) || bride === '' ? "form-control" : "is-invalid form-control"}/>
            <div className="invalid-feedback text-white">Too Long</div>
          </div>

          <div className="form-label-group mb-4">
            <input type="text" name="groom" placeholder="Partner's Name" required
              onChange={(e) => this.handleChange(e)} 
              className={this.validation(groom) || groom === '' ? "form-control" : "is-invalid form-control"}/>
            <div className="invalid-feedback text-white">Too Long</div>
          </div>
          <Link className={canIssue 
              ? 'btn btn-lg btn-block btn-outline-pink' 
              : 'btn btn-lg btn-block btn-outline-pink disabled'
            } to={`/certification/sample/${bride}/${groom}`}>Issue Sample Certification</Link>
        </form>
      </div>
    )
  }
}

export default Home;
