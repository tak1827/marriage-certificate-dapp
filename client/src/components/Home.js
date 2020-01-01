import React, { Component } from "react"
import { Determinator, MultiLang } from "react-multi-language"

import { Link } from "react-router-dom"
import { toHex } from "../utils/hex"
import { langIsJa } from "../utils/common"

import IconImg from "../images/icon.png"

class Home extends Component {
  state = {
    bride: '',
    groom: '',
    lang: 'en',
  }

  componentDidMount = () => this.setState({lang: langIsJa() ? 'ja' : this.state.lang})

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
          <h1 className="text-white">
            <Determinator>
              {{
                en: 'Marriage certificate on Blockchain',
                ja: 'ブロックチェーンで婚約証明書を発行'
              }}
            </Determinator>
          </h1>
          <p className="lead text-white">
            <Determinator>
              {{
                en: 'Blockchain prove your marriage forever even you go. Issue marriage certificate for everybody even sexual minorities.',
                ja: 'ブロックチェーン上にあなた方の婚約を永遠に記録します。いかなるセクシャルマイノリティーでも発行可能です。'
              }}
            </Determinator>
          </p>
        </div>
        <form className="form-signin">
          <div className="text-center mb-4">
            <p className="lead text-white">
              <Determinator>
                {{
                  en: "We are going to show you a sample certificate.Please tell us your name and your partner's name.",
                  ja: '証明書のサンプルを発行します。あなたのお名前と、パートナーのお名前を教えてください。'
                }}
              </Determinator>
            </p>
          </div>

          <div className="form-label-group mb-2">
            <input type="text" name="bride" placeholder={this.state.lang === 'ja' ? "あなたのお名前" : "Your Name"} required
              onChange={(e) => this.handleChange(e)}
              className={this.validation(bride) || bride === '' ? "form-control" : "is-invalid form-control"}/>
            <div className="invalid-feedback text-white">Too Long</div>
          </div>

          <div className="form-label-group mb-4">
            <input type="text" name="groom" placeholder={this.state.lang === 'ja' ? "パートナーのお名前" : "Partner's Name"} required
              onChange={(e) => this.handleChange(e)}
              className={this.validation(groom) || groom === '' ? "form-control" : "is-invalid form-control"}/>
            <div className="invalid-feedback text-white">Too Long</div>
          </div>
          <Link className={canIssue
              ? 'btn btn-lg btn-block btn-outline-pink'
              : 'btn btn-lg btn-block btn-outline-pink disabled'
            } to={`/certificate/sample/${bride}/${groom}`}>
            <Determinator>
            {{
              en: 'Issue Sample Certification',
              ja: 'サンプル証明書発行'
            }}
            </Determinator>
          </Link>
        </form>
        <MultiLang lang={this.state.lang}/>
      </div>
    )
  }
}

export default Home;
