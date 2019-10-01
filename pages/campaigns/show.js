import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'

// TODO: Redeploy contract!!
class CampaignShow extends Component {
  static async getInitialProps (props) {
    let summary
    try {
      const campaign = Campaign(props.query.address)
      summary = await campaign.methods.getSummary().call()
    } catch (error) {
      summary = {
        '0': '100',
        '1': '0',
        '2': '0',
        '3': '0',
        '4': 'funder'
      }
    }
    return {
      minimumContribution: summary['0'],
      balance: summary[1],
      requestCount: summary[2],
      backersCount: summary[3],
      funder: summary[4]
    }
    // return {
    //   '0': '100',
    //   '1': '0',
    //   '2': '0',
    //   '3': '0',
    //   '4': 'funder'
    // }
  }

  renderCards () {
    const {
      minimumContribution,
      balance,
      requestCount,
      backersCount,
      funder
    } = this.props
    const items = [
      {
        header: '0xwererewr564we4r56we4r56w456er46w4er6',
        meta: 'Address of funder',
        description:
          'Funder created this campaign and can create payment requests.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: balance,
        meta: 'Balance (wei)',
        description: 'Funds available'
      },
      {
        header: requestCount,
        meta: 'Requests',
        description: 'Payment requests created by the funded'
      },
      {
        header: minimumContribution,
        meta: 'minimum contribution amount (wei)',
        description: 'Amount required to become a backer'
      },
      {
        header: backersCount,
        meta: 'Backers',
        description: 'Number of people that backed this campaign'
      },
  ]

    return <Card.Group items={items} />
  }
  render () {
    console.log(this.props.summary)
    return (
      <Layout>
        <h2>Show Campaign</h2>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow
