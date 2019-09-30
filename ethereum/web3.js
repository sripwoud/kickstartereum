import Web3 from 'web3'
// import fs from 'fs'

let web3
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  /* We are in the browser & Metamask is installed:
 Metamask has injected web3 in the browser
(won't work with Server Side Rendering) */
  web3 = new Web3(window.web3.currentProvider)
} else {
  /* We are not in the browser (server side rendering)
  or user is not running Metamask */
  // const infuraKey = fs.readFileSync('./.infuraKey').toString().trim()
  const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/${process.env.INFURA_KEY}`)
  web3 = new Web3(provider)
}

export default web3
