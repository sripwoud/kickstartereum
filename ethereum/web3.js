import Web3 from 'web3'
// require('dotenv').config()

let web3
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  /* We are in the browser & Metamask is installed:
  Ethereum user detected. You can now use the provider. */
  const provider = window.ethereum
  ethereum.enable()
  web3 = new Web3(provider)
} else {
  /* We are not in the browser (server side rendering)
  or user is not running Metamask */
  const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`)
  web3 = new Web3(provider)
  // console.log(provider)
}

export default web3
