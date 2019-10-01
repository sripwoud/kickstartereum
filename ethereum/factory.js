import web3 from './web3'
import path from 'path'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.ADDRESS
)

export default instance
