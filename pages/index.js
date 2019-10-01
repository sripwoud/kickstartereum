import React, { Component } from 'react'
import instance from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

import Layout from '../components/Layout'
import { Link } from '../routes'

class CampaignIndex extends Component {
  static async getInitialProps () {
    let campaigns
    try {
      campaigns = await instance.methods.getDeployedCampaigns().call()
    } catch (error) {
      // For  testing with fake data
      campaigns = [
        '123',
        '456'
      ]
    }
    return { campaigns }
  }

  renderCampaigns = () => {
    const items = this.props.campaigns.map(address => {
      return {
        header: `Address ${address}`,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
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
          <Link route='/campaigns/new'>
          <a>
            <Button
              content='Create Campaign'
              icon='add circle'
              primary
              floated='right'
            />
          </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex
