const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath) // delete folder and its content

const contractsPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(contractsPath, 'utf8') // read content of file

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol']
// recreate build folder
fs.ensureDirSync(buildPath)
// loop over output object and export contracts
for (const contract in output) {
  // creates an output JSON file from an object
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  )
}
