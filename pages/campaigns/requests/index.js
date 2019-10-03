import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'

import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestsIndex extends Component {
  static async getInitialProps (props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestsCount = await campaign.methods.getRequestsCount().call()
    const backersCount = await campaign.methods.backersCount().call()
    const requests = await Promise.all(
      Array(+requestsCount)
        .fill()
        .map((el, index) => {
          return campaign.methods.requests(index).call()
        })
    )

    return { address, requests, backersCount }
  }

  renderRows () {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          address={this.props.address}
          id={index}
          backersCount={this.props.backersCount}
        />
      )
    })
  }

  render () {
    const { Header, Row, HeaderCell, Body } = Table
    return (
      <Layout>
        <h2>Requests</h2>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>
              Add request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row textAlign='center'>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ETH)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approvals</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
      </Layout>
    )
  }
}

export default RequestsIndex
