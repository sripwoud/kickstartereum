import React, { Component } from 'react'
import instance from '../ethereum/factory'
import { Button, Card } from 'semantic-ui-react'

import Layout from '../components/Layout'
import { Link } from '../routes'

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaignsCount = await instance.methods.getCampaignsCount().call()
    const campaigns = await Promise.all(
      Array(+campaignsCount)
        .fill()
        .map((el, index) => {
          return instance.methods.projects(index).call()
        }),
    )
    return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((campaign) => {
      const { title, projectAddress } = campaign
      return {
        header: title,
        description: (
          <Link route={`/campaigns/${projectAddress}`}>
            <a>View Campaign</a>
          </Link>
        ),
        meta: `Address ${projectAddress}`,
        fluid: true,
      }
    })
    return <Card.Group items={items} />
  }

  render() {
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
