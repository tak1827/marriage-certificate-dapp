import Web3 from "web3"

const getWeb3 = (useUetamask = false) =>
  new Promise(async (resolve, reject) => {
    if (useUetamask) {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable()
          // Acccounts now exposed
          resolve(new Web3(window.ethereum))
        } catch (error) {
          reject(error)
        }
      // Legacy dapp browsers...
      } else if (window.web3) {
        resolve(window.web3)
      } else {
        reject(new Error('Please install metamask'))
      }
    } else {
      resolve(new Web3(new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/17d6cc16e48d403c89a993c39c940f5b"
      )))
    }
  })

export default getWeb3
