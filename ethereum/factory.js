import web3 from './web3'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x4308bfd6c6Cd829B6D342C90b43bEF46700Cec8D',
)

export default instance
