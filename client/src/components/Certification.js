import React, { Component } from "react";
import { Link } from "react-router-dom";
import { redirectRoot } from "../utils/common";
import { fromHex } from "../utils/hex";

class Certification extends Component {
  state = {
    bride: '',
    groom: '',
  }

  componentDidMount() {
    // let { bride, groom } = useParams()
    // this.setState({bride: fromHex(bride)})
    // this.setState({groom: fromHex(groom)})
  }

  validateCertificationID(value) {
    console.log(value)
    return value
  }

  render() {
    const params = this.props.match.params
    const bride = fromHex(params.bride)
    const groom = fromHex(params.groom)
    const isSample = !this.validateCertificationID(params.groom.id)

    return (
      <div className="bg-white">
        <div className="container py-5">
          <div className="cross-line text-center my-2 mx-2">
            <div className="row mt-3">
              <div className="col">
                <img className="d-block mx-auto mb-4" src="/img/gorgeous-line-top.png" alt="" width="300" height="50"/>
                { isSample ? <h3>Sample</h3> : ''}
                <h1 className="text-pink">Certificate of Marriage</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <p className="lead mx-4 border-line">{bride}</p>
              </div>
              <div className="col-md-2">
                <p>And</p>
              </div>
              <div className="col-md-5">
                <p className="lead mx-4 border-line">{groom}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Were United in Marriage on <code className="border-line text-dark">
                { isSample ? (new Date()).toLocaleDateString('en-US') : '11/11/2019'}
                </code><br/>This Certification was Recored in a Smart Contract of Ethereum.</p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-1"></div>
              <div className="col-md-8 text-left">
                <blockquote className="blockquote ml-2">
                  <p className="mb-0">Transaction Hash:</p>
                  <footer className="blockquote-footer break-word">
                    { isSample 
                      ? '0x0000000000000000000000000000000000000000' 
                      : '0x52011FF7ec3c9DeA102A99aeF0eB035D6359BCf3' 
                    }
                  </footer>
                </blockquote>
                <blockquote className="blockquote ml-2">
                  <p className="mb-0">Certification ID:</p>
                  <footer className="blockquote-footer break-word">
                    { isSample
                      ? '0x00000'
                      : '0x52011'
                    }
                  </footer>
                </blockquote>
              </div>
              <div className="col-md-2">
                <img src="/img/certification-stamp.png" alt="Responsive image" width="130" height="150"/>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col">
                <img className="d-block mx-auto mb-4" src="/img/gorgeous-line-bottom.png" alt="" width="270" height="30"/>
              </div>
            </div>
          </div>
        </div>

        <div className="pink lighten-1">
          <div className="container">
            <div className="row text-white">
              <div className="col">
                <p className="lead my-1">Share with your partner</p>
                <nav className="mb-2">
                  <img className="mr-2" src="/img/facebook-icon.svg" alt="" width="30" height="30"/>
                  <img className="mr-2" src="/img/twitter-icon.svg" alt="" width="30" height="30"/>
                  <img className="mr-2" src="/img/mail-icon.svg" alt="" width="30" height="30"/>
                </nav>
              </div>
            </div>
            { isSample
              ? <div className="row mb-2">
                  <div className="col">
                    <Link className="btn btn-lg btn-block btn-outline-pink" 
                      to={`/issue/${params.bride}/${params.groom}`}>Next</Link>
                  </div>
                </div>
              : ''
             }
          </div>
        </div>
      </div>
    )
  }
}

export default Certification;
