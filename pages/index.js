import React, { Component } from 'react'
import instance from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

import Layout from '../components/Layout'

class CampaignIndex extends Component {
  static async getInitialProps () {
    const campaigns = await instance.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  renderCampaigns = () => {
    const items = this.props.campaigns.map(address => {
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
          <Button
            content='Create Campaign'
            icon='add circle'
            primary
            floated='right'
          />
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex