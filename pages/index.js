import React, { Component } from 'react'
import instance from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

import Layout from '../components/Layout'

class CampaignIndex extends Component {
  // static async getInitialProps () {
  //   const campaigns = await instance.methods.getDeployedCampaigns().call()
  //   return { campaigns }
  // }
  renderCampaigns = () => {
    const campaigns = ['1', '2']
    const items = campaigns.map(address => {
      return {
        header: `Address ${address}`,
        description: <a>View Campaign</a>,
        fluid: true
      }
    })
    return <Card.Group items={items} />
  }

  render () {
    return (
      <Layout>
        <div>
          <h2>Open Campaigns</h2>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
          {this.renderCampaigns()}
          <Button
            content='Create Campaign'
            icon='add circle'
            primary
          />
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex
