import web3 from './web3'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x1EB0ef281158ebCcaCf097E02111F3AB9E0743Cc'
)

export default instance
