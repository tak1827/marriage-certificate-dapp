import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Determinator, MultiLang } from "react-multi-language"

import contractDefinition from "../contracts/MarriageCertificateIssuer.json"
import getWeb3 from "../utils/getWeb3"
import getContractInstance from '../utils/getContractInstance'
import { buildFBLink, buildTWLink, buildMLink, langIsJa } from "../utils/common"
import { toHex, fromHex } from "../utils/hex"

import LineTopImg from "../images/gorgeous-line-top.png"
import LineBottomImg from "../images/gorgeous-line-bottom.png"
import CerImg from "../images/certificate-stamp.png"
import FacebookImg from "../images/facebook-icon.svg"
import TwitterImg from "../images/twitter-icon.svg"
import MailImg from "../images/mail-icon.svg"

const PREFIX_NUM = 20000000

class Certificate extends Component {
  state = {
    bride: '',
    groom: '',
    cerID: '0x00000',
    txHash: '0x0000000000000000000000000000000000000000',
    issuedDate: (new Date()).toLocaleDateString('en-US'),
    lang: 'en',
  }

  componentDidMount = async () => {
    this.setState({lang: langIsJa() ? 'ja' : this.state.lang})

    const params = this.props.match.params

    // Sample Page
    if (this.isSample()) {
      this.setState({ bride: fromHex(params.bride), groom: fromHex(params.groom) })
      return
    }

    // Real Page
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContractInstance(web3, contractDefinition)

      const id = decodeCertificateID(params.id)
      const certificate = await contract.methods.certificates(id).call({ from: accounts[0] })
      const receipt = await web3.eth.getTransactionReceipt(params.txHash)
      const block = await web3.eth.getBlock(receipt.blockNumber)

      this.setState({
        bride: fromHex(certificate.bride.replace(/^0x0*/,'')),
        groom: fromHex(certificate.groom.replace(/^0x0*/,'')),
        cerID: params.id,
        txHash: params.txHash,
        issuedDate: (new Date(block.timestamp * 1000)).toLocaleDateString('en-US'),
      })

    } catch (e) {
      alert(e.message, console.error(e))
    }
  }

  isSample = () => this.props.match.path === '/certificate/sample/:bride/:groom/'

  render() {
    const isSample = this.isSample()
    return (
      <div className="bg-white">
        <div className="container py-5">
          <div className="cross-line text-center my-2 mx-2">
            <div className="row mt-3">
              <div className="col">
                <img className="d-block mx-auto mb-4" src={LineTopImg} alt="" width="300" height="50"/>
                { isSample ? <h3>Sample</h3> : ''}
                <h1 className="text-pink"><font face="cursive">Certificate of Marriage</font></h1>
                <h3 className="text-pink">Recorded forever in Blockchain</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <p className="lead mx-4 border-line"><font face="cursive">{this.state.bride}</font></p>
              </div>
              <div className="col-md-2">
                <p>And</p>
              </div>
              <div className="col-md-5">
                <p className="lead mx-4 border-line"><font face="cursive">{this.state.groom}</font></p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Were United in Marriage on <code className="border-line text-dark"><font face="cursive">{this.state.issuedDate}</font></code><br/>This Certificate was Recored in a Smart Contract of Ethereum.</p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-1"></div>
              <div className="col-md-8 text-left">
                <blockquote className="blockquote ml-2">
                  <p className="mb-0">Transaction Hash:</p>
                  <footer className="blockquote-footer break-word">
                  {
                    isSample
                      ? <div>{this.state.txHash}</div>
                      : <a href={`https://etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">
                          {this.state.txHash}
                        </a>
                  }
                  </footer>
                </blockquote>
                <blockquote className="blockquote ml-2">
                  <p className="mb-0">Certificate ID:</p>
                  <footer className="blockquote-footer break-word">{this.state.cerID}</footer>
                </blockquote>
              </div>
              <div className="col-md-2">
                <img src={CerImg} alt="certificates stamp" width="130" height="150"/>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col">
                <img className="d-block mx-auto mb-4" src={LineBottomImg} alt="" width="270" height="40"/>
              </div>
            </div>
          </div>
        </div>

        <div className="pink lighten-1">
          <div className="container">
            <div className="row text-white">
              <div className="col">
                <p className="lead my-1">
                  <Determinator>
                  {{
                    en: 'Share with your partner',
                    ja: 'パートナーにシェアしましょう。'
                  }}
                  </Determinator>
                </p>
                <nav className="mb-2">
                  <ul className="nav">
                    <li className="nav-item">
                      <a href={buildFBLink()} target="_blank" rel="noopener noreferrer" className="nav-link sns"><img src={FacebookImg} alt="" width="40" height="40"/></a>
                    </li>
                    <li className="nav-item">
                      <a href={buildTWLink()} target="_blank" rel="noopener noreferrer" className="nav-link sns"><img src={TwitterImg} alt="" width="40" height="40"/></a>
                    </li>
                    <li className="nav-item">
                      <a href={buildMLink()} target="_blank" rel="noopener noreferrer" className="nav-link sns"><img src={MailImg} alt="" width="40" height="40"/></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            { isSample
              ? <div className="row mb-2">
                  <div className="col">
                    <Link className="btn btn-lg btn-block btn-outline-pink"
                      to={`/issue/${toHex(this.state.bride)}/${toHex(this.state.groom)}`}>
                      <Determinator>
                      {{
                        en: 'Next',
                        ja: '次へ'
                      }}
                      </Determinator>
                    </Link>
                  </div>
                </div>
              : ''
             }
          </div>
        </div>
        <MultiLang lang={this.state.lang}/>
      </div>
    )
  }
}

const decodeCertificateID = (hex) => Number(fromHex(hex.replace(/^0x/, ""))) - PREFIX_NUM - 1

export default Certificate
