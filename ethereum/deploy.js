require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const fs = require('fs-extra')

const path = require('path')
const { abi, evm: { bytecode: { object: bytecode } } } = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/${process.env.INFURA_KEY}`
)
const web3 = new Web3(provider)
// define function so that we can use await/async syntax (optional)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Trying to deploy from account', accounts[0])

  try {
    const factory = await new web3.eth.Contract(abi)
      .deploy({ data: '0x' + bytecode })
      .send({ from: accounts[0], gas: '1800000' })

    console.log('Contract deployed to', factory.options.address)
    fs.readFile(
      path.resolve(__dirname, '.env'),
      'utf8',
      (err, data) => {
        if (!err) {
          const splitArray = data.split('\n')
          if (splitArray.length === 4) {
            splitArray.splice(2, 2)
          }
          splitArray.push(`ADDRESS=${factory.options.address}`)
          const result = splitArray.join('\n')
          fs.writeFile(path.resolve(__dirname, '.env'), result)
        } else {
          console.log(err)
        }
      })
  } catch (e) {
    console.log('Failed to deploy:', e.message)
  }
}
deploy()
