const sendTransaction = async (transaction, from, value=0, web3) => {
  const gas = await transaction.estimateGas({ from, value })

  console.log("Estimaged Gas:" + gas)
  console.log(transaction)

  let options = {
    from,
    data: transaction.encodeABI(),
    gas: gas + 10000,
    gasPrice: 10000000000,
    value
  }

  const receipt = await transaction.send(options)

  console.log(receipt)

  if (!receipt.blockHash) throw new Error('Failed to send transaction')

  return receipt;
}

export default sendTransaction
