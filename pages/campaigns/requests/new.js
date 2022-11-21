import React, { Component } from 'react'
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react'

import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'

class NewRequest extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: '',
  }

  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const campaign = await Campaign(this.props.address)
    const { description, value, recipient } = this.state
    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <Link
          legacyBehavior
          route={`/campaigns/${this.props.address}/requests`}
        >
          <a>
            <Icon name='left arrow' />
            Back
          </a>
        </Link>
        <h2>Create a new payment request</h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value (ETH)</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient (address)</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header='Ooops' content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default NewRequest
