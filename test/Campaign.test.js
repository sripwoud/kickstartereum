const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())
const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign
beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: `0x${compiledFactory.evm.bytecode.object}` })
    .send({ from: accounts[0], gas: '1800000' })

  // create one campaign
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });
  // get campaign contract address
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

  // create instance of already deployed campaign contract
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)
})

describe('Kickstartethereum', () => {
  it('deploys factory and campaign contracts', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('marks creator of new campaign as funder', async () => {
    assert.equal(
      await campaign.methods.funder().call(),
      accounts[0],
      'Account used for campaign contract deployment should be the funder'
    )
  })

  it('sets minimum contribution', async () => {
    assert.equal(
      await campaign.methods.minimumContribution().call(),
      +100,
      'minimum contribution amount not properly set'
    )
  })

  it('people can contribute money and be listed as backers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('1', 'ether')
    })
    assert(
      await campaign.methods.backers(accounts[1]).call(),
      'Second account should be listed as backer'
    )
    assert.equal(
      await web3.eth.getBalance(campaign.options.address),
      web3.utils.toWei('1', 'ether'),
      'Wrong campaign contract balance'
    )
  })

  it(
    'requires a minimum amount of contribution to be listed as backer',
    async () => {
      try {
        await campaign.methods.contribute().send({
          from: accounts[2],
          value: '50' // < 100 wei
        })
        assert(false)
      } catch (error) {
        assert(error)
      }
    })

  it('manager can make a payment request', async () => {
    await campaign.methods.createRequest(
      'Test',
      '1000',
      accounts[2]
    ).send({ from: accounts[0], gas: '1000000' })

    const [
      description,
      amount,
      recipient,
      complete,
      approvalsCount
    ] = Object.values(await campaign.methods.requests(0).call())
    assert.equal(description, 'Test')
    assert.equal(amount, '1000')
    assert.equal(recipient, accounts[2])
    assert(!complete)
    assert.equal(approvalsCount, 0)
  })

  it('fails to create payment request if not manager', async () => {
    try {
      await campaign.methods.createRequest(
        'Test',
        '1000',
        accounts[2]
      ).send({ from: accounts[1], gas: '1000000' })
      assert(false)
    } catch (e) {
      assert(e)
    }
  })
})
