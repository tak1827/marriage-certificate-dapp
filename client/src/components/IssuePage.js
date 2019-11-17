import React, { Component } from "react";
import { redirectRoot } from "../utils/common";

import contractDefinition from "../contracts/MarriageCertificationIssuer.json";
import getWeb3 from "../utils/getWeb3";
import getContractInstance from '../utils/getContractInstance'
import sendTransaction from '../utils/sendTransaction'
import { toHex } from "../utils/hex";

class IssuePage extends Component {

  componentDidMount = () => redirectRoot(!this.props.crtif.bride || !this.props.crtif.groom)

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
    return (
      <div>
        <h2>IssuePage</h2>
        <p>{this.props.crtif.bride}</p>
        <p>{this.props.crtif.groom}</p>
        <button onClick={() => this.handleClick()}>Issue</button>
      </div>
    );
  }
}

const padTo32byte = (hex) => `0x${toHex(hex).padStart(64, '0')}`

export default IssuePage;
