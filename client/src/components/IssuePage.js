import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Determinator, MultiLang } from "react-multi-language"

import contractDefinition from "../contracts/MarriageCertificateIssuer.json"
import getWeb3 from "../utils/getWeb3"
import getContractInstance from '../utils/getContractInstance'
import sendTransaction from '../utils/sendTransaction'
import { toHex, fromHex } from "../utils/hex"
import { langIsJa } from "../utils/common"

class IssuePage extends Component {
  state = {
    issuing: false,
    issued: false,
    bride: '',
    groom: '',
    cerID: '',
    txHash: '',
    lang: 'en',
  }

  componentDidMount() {
    this.setState({lang: langIsJa() ? 'ja' : this.state.lang})

    const params = this.props.match.params
    this.setState({bride: params.bride, groom: params.groom})
  }

  handleChange = (e) => this.setState({[e.target.name]: toHex(e.target.value)})

  handleClick = async () => {
    if (this.state.issued) {
      const s = this.state
      window.location.href = `/certificate/${s.cerID}/${s.txHash}`
    }

    try {
      this.setState({issuing: true})
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContractInstance(web3, contractDefinition)

      const bride = padTo32byte(this.state.bride)
      const groom = padTo32byte(this.state.groom)
      const fee = await contract.methods.FEE().call({ from: accounts[0] })

      const transaction = contract.methods.issueCertificate(bride, groom)
      const receipt = await sendTransaction(transaction, accounts[0], fee)

      this.setState({
        issued: true,
        issuing: false,
        cerID: `0x${toHex(receipt.events.Issued.returnValues.certificateID)}`,
        txHash: receipt.transactionHash
      },() => {
        document.getElementById('show-certificate').click()
      })

    } catch (e) {
      this.setState({issuing: false})
      alert(e.message, console.error(e))
    }
  }

  render() {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="text-white">
            <Determinator>
            {{
              en: 'Issue Real Marriage Certificate',
              ja: '本物の証明書を発行します'
            }}
            </Determinator>
          </h1>
        </div>
        <form className="form-signin">
          <div className="text-left mb-4">
            <p className="lead text-white">
              <Determinator>
              {{
                en: "Confirm your and your partner's name.",
                ja: 'あなたとパートーナーのお名前を確認してください。'
              }}
              </Determinator>
            </p>
          </div>
          <div className="form-label-group mb-2">
            { this.state.issued || this.state.issuing
              ? <input type="text" className="form-control" value={fromHex(this.state.bride)} readOnly/>
              : <input type="text" name="bride" className="form-control"
                  value={fromHex(this.state.bride)} onChange={(e) => this.handleChange(e)} />
            }
          </div>
          <div className="form-label-group mb-4">
            { this.state.issued || this.state.issuing
              ? <input type="text" className="form-control" value={fromHex(this.state.groom)} readOnly/>
              : <input type="text" name="groom" className="form-control"
                  value={fromHex(this.state.groom)} onChange={(e) => this.handleChange(e)} />
            }
          </div>
          <div className="text-left mb-4">
            <p className="lead text-white">
              <Determinator>
                {{
                  en: 'Issue marriage certificate on Ethereum.',
                  ja: '婚約証明書をイーサリアム上に発行します。'
                }}
              </Determinator>
              <br/>
              <u>0.02 ETH</u>
              <Determinator>
                {{
                  en: ' is issuance fee. And, ',
                  ja: 'が発行手数料です。そして、'
                }}
              </Determinator>
              <a className="text-white"href="https://metamask.io/"><strong>MetaMask</strong></a>
              <Determinator>
                {{
                  en: ' is required. Please install in advance. Then please make sure that enough ETH have been deposited.',
                  ja: 'が必要です。事前にインストールしてください。また、十分な量のETHを入金してください。'
                }}
              </Determinator>
            </p>
            <p className="lead text-white">
              <Determinator>
                {{
                  en: 'If you have prepared, please click the following button. It may take few minutes for issuing. Sorry for keeping you wait.',
                  ja: '準備ができたら下のボタンを押してください。場合によっては、発行に数分かかります。ご不便をおかけして申し訳ございません。'
                }}
              </Determinator>
            </p>
          </div>
          { this.state.issuing
            ? <button className = "btn btn-lg btn-block btn-outline-pink mb-4" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <Determinator>
                  {{
                    en: 'Issuing...',
                    ja: '発行中...'
                  }}
                </Determinator>
              </button>
            : <button className = "btn btn-lg btn-block btn-outline-pink mb-4" onClick = {(e) => this.handleClick(e)}>
                { this.state.issued
                  ? this.state.lang === 'ja' ? '証明書を見る' : 'View Certificate'
                  : this.state.lang === 'ja' ? '本物の証明書を発行' : 'Issue Real Certificate'}
              </button>
          }
          <Link Id="show-certificate" className="d-none" to={`/certificate/${this.state.cerID}/${this.state.txHash}`}>Show Certificate
          </Link>
        </form>
        <MultiLang lang={this.state.lang}/>
      </div>
    )
  }
}

const padTo32byte = (hex) => `0x${hex.padStart(64, '0')}`

export default IssuePage
