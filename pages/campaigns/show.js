import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import ContributeForm from '../../components/ContributeForm'
import Campaign from '../../ethereum/campaign'
import { Link } from '../../routes'

// TODO: Redeploy contract!!
class CampaignShow extends Component {
  static async getInitialProps (props) {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      backersCount: summary[3],
      funder: summary[4]
    }
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
        header: funder,
        meta: 'Address of funder',
        description:
          'Created this campaign and can create payment requests.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: balance,
        meta: 'Balance (wei)',
        description: 'Funds available  = (received - spent by requests)'
      },
      {
        header: requestCount,
        meta: 'Requests',
        description:
        `Payment requests created by the funder.
        Requests tries to spend money received by the campaign.
        A majority of backers must approve this request before it can be performed.`
      },
      {
        header: minimumContribution,
        meta: 'minimum contribution (wei)',
        description: 'Minimum amount to contribute to become a backer'
      },
      {
        header: backersCount,
        meta: 'Backers',
        description: 'Number of people that backed this campaign'
      }
    ]

    return <Card.Group items={items} />
  }

  render () {
    return (
      <Layout>
        <h2>Show Campaign</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow
