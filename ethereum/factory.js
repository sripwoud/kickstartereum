import web3 from './web3'
import path from 'path'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x8D67A9A16F92f0Ac541C94bECDC639831DfbD5AA'
)

export default instance
