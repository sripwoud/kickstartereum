import React, { Component } from 'react'
import instance from '../ethereum/factory'

class CampaignIndex extends Component {
  async componentDidMount () {
    const campaigns = await instance.methods.getDeployedCampaigns().call()
    console.log(campaigns)
  }

  render () {
    return (
      <h1>Home page</h1>
    )
  }
}

export default CampaignIndex
