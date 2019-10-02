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
    const count = await campaign.methods.getRequestsCount().call()
    const requests = await Promise.all(
      Array(+count)
        .fill()
        .map((el, index) => {
        return campaign.methods.requests(index).call()
        })
    )

    return { address }
  }

  renderRows () {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          address={address}
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
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
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
