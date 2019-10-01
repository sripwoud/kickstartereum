# AirCrowd
## Introduction
## Getting started
0. Clone or download this repository
0. Install dependencies: `/aircrowd $ npm i`
1. Compile smart contract code: `/airCrowd/ethereum$ node compile`
2. Set environment variables required for deployment. Create a `.env` file in
`/ethereum` with the following lines:
```
INFURA_KEY=<your infura project id>
MNEMONIC=<your metammask mnemonic>
```
2. Deploy contract: `/airCrowd/ethereum$ node deploy`
3. Edit `ethereum/factory.js` and update the address (line 7)
4. Run client application: `$ npm run dev`
5. Access at [localhost:3000](http://localhost:3000/)

## Tests
`npm test`
## Resources
- [Metamask](https://metamask.io/): 'brings Ethereum to your browser.''
- [web3.js](https://github.com/ethereum/web3.js/): Ethereum JavaScript API.
- [React.js](https://reactjs.org/): 'a JavaScript library for building user interfaces'
- [Next.js](https://nextjs.org/)
- [Semantic-ui](https://react.semantic-ui.com/): 'development framework that helps create beautiful, responsive layouts using human-friendly HTML.' Official React integration.
- [Mocha](https://mochajs.org/): 'the fun, simple, flexible, JavaScript framework.'
