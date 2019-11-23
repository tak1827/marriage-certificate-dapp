import React, { Component } from "react";
import { redirectRoot } from "../utils/common";

import contractDefinition from "../contracts/MarriageCertificationIssuer.json";
import getWeb3 from "../utils/getWeb3";
import getContractInstance from '../utils/getContractInstance'
import sendTransaction from '../utils/sendTransaction'
import { toHex, fromHex } from "../utils/hex";

class IssuePage extends Component {

  handleClick = async () => {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContractInstance(web3, contractDefinition)

      const bride = padTo32byte(this.props.crtif.bride)
      const groom = padTo32byte(this.props.crtif.groom)
      const fee = await contract.methods.FEE().call({ from: accounts[0] })

      const transaction = contract.methods.issueCertification(bride, groom)
      const status = await sendTransaction(transaction, accounts[0], fee)

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    const params = this.props.match.params
    const bride = fromHex(params.bride)
    const groom = fromHex(params.groom)

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
            <input type="text" className="form-control" value={bride}/>
          </div>
          <div className="form-label-group mb-4">
            <input type="text" className="form-control" value={groom}/>
          </div>
          <div className="text-left mb-4">
            <p className="lead text-white">We issue marriage certification on Ethereum and take <u>0.02</u> ETH as issuance fee. Please make sure that <a className="text-white"href="https://metamask.io/"><strong>MetaMask</strong></a> have installed and enough ETH have been deposited.</p>
            <p className="lead text-white">If you have prepared, we issue marriage certification for you. It may take few minutes. Be patient.</p>
          </div>
          <button className="btn btn-lg btn-block btn-outline-pink mb-4" 
            onClick={() => this.handleClick()}>Issue Real Certification</button>
        </form>
      </div>
    );
  }
}

const padTo32byte = (hex) => `0x${toHex(hex).padStart(64, '0')}`

export default IssuePage;
