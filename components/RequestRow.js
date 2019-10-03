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
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(amount, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalsCount}/{backersCount}</Cell>
        <Cell>
          <Button
            basic
            color='green'
            onClick={this.onApprove}
            disabled={complete}>
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button positive onClick={this.onFinalize} disabled={complete}>
            Finalize
          </Button>
        </Cell>
        <Cell>
          <Icon name={`toggle ${complete ? 'on' : 'off'}`} size='large'/>
        </Cell>
      </Row>
    )
  }
}

export default RequestRow
