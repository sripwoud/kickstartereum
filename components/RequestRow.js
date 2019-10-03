import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] })
    Router.pushRoute(`/campaigns/${this.props.address}/requests`)
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({ from: accounts[0] })
    Router.pushRoute(`/campaigns/${this.props.address}/requests`)
  }

  render () {
    const { Row, Cell } = Table
    const {
      id,
      request: { description, amount, recipient, approvalsCount, complete },
      backersCount
    } = this.props
    const readyToFinalize = approvalsCount > backersCount / 2
    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(amount, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalsCount}/{backersCount}</Cell>
        <Cell>
          { complete ? null : (
            <Button basic color='green' onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          { complete ? null : (
            <Button
              positive
              onClick={this.onFinalize}
              disabled={!readyToFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}

export default RequestRow
