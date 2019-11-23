import React, { Component } from "react";
import { redirectRoot } from "../utils/common";

import contractDefinition from "../contracts/MarriageCertificationIssuer.json";
import getWeb3 from "../utils/getWeb3";
import getContractInstance from '../utils/getContractInstance'
import sendTransaction from '../utils/sendTransaction'
import { toHex, fromHex } from "../utils/hex";

class IssuePage extends Component {
  state = {
    issuing: false,
    issued: false,
    bride: '',
    groom: '',
    certificationID: '',
    txHash: '',
  }

  componentDidMount() {
    const params = this.props.match.params
    this.setState({bride: params.bride, groom: params.groom})
  }

  handleChange = (e) => this.setState({[e.target.name]: toHex(e.target.value)})

  handleClick = async () => {
    if (this.state.issued) {
      const s = this.state
      window.location.href = `/certification/${s.certificationID}/${s.txHash}`
    }

    try {
      this.setState({issuing: true})
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContractInstance(web3, contractDefinition)

      const bride = padTo32byte(this.state.bride)
      const groom = padTo32byte(this.state.groom)
      const fee = await contract.methods.FEE().call({ from: accounts[0] })

      const transaction = contract.methods.issueCertification(bride, groom)
      const receipt = await sendTransaction(transaction, accounts[0], fee)

      this.setState({ 
        issued: true, 
        issuing: false, 
        certificationID: `0x${toHex(receipt.events.Issued.returnValues.certificationId)}`, 
        txHash: receipt.transactionHash
      })

    } catch (e) {
      this.setState({issuing: false})
      alert(e.message, console.error(e));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="text-white">Issue Real Marriage certification</h1>
        </div>
        <form className="form-signin">
          <div className="text-left mb-4">
            <p className="lead text-white">Confirm your and your partner's name.</p>
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
            <p className="lead text-white">We issue marriage certification on Ethereum and take <u>0.02</u> ETH as issuance fee. Please make sure that <a className="text-white"href="https://metamask.io/"><strong>MetaMask</strong></a> have installed and enough ETH have been deposited.</p>
            <p className="lead text-white">If you have prepared, we issue marriage certification for you. It may take few minutes. Be patient.</p>
          </div>
          { this.state.issuing
            ? <button className = "btn btn-lg btn-block btn-outline-pink mb-4" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Issuing...
              </button>
            : <button className = "btn btn-lg btn-block btn-outline-pink mb-4" onClick = {(e) => this.handleClick(e)}>
                { this.state.issued  ? 'View Certification' : 'Issue Real Certification'}
              </button>
          }
          
        </form>
      </div>
    );
  }
}

const padTo32byte = (hex) => `0x${hex.padStart(64, '0')}`

export default IssuePage;
