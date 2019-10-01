import web3 from './web3'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x1Ca07df617c8bC22f964C407b1Fd9e4D90ab527d'
)

export default instance
