// require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const fs = require('fs-extra')

const path = require('path')
const {
  abi,
  evm: {
    bytecode: { object: bytecode },
  },
} = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider({
  privateKeys: [process.env.PRIVATE_KEY],
  providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
  chainId: 5,
})
const web3 = new Web3(provider)
// define function so that we can use await/async syntax (optional)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Trying to deploy from account', accounts[0])

  try {
    const factory = await new web3.eth.Contract(abi)
      .deploy({ data: '0x' + bytecode })
      .send({ from: accounts[0] })

    console.log('Contract deployed to', factory.options.address)
    fs.readFile(path.resolve(__dirname, '.env'), 'utf8', (err, data) => {
      if (!err) {
        const splitArray = data.trim().split('\n')
        if (splitArray.length === 3) {
          splitArray.splice(2, 1)
        }
        splitArray.push(`ADDRESS=${factory.options.address}`)
        const result = splitArray.join('\n')
        fs.appendFileSync(path.resolve(__dirname, '.env'), result)
      } else {
        console.log(err)
      }
    })
  } catch (e) {
    console.log('Failed to deploy:', e.message)
  }
}

deploy()
  .then(() => {
    console.log('done')
    process.exit(0)
  })
  .catch((e) => console.error(e))
