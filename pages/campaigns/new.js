import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

import web3 from '../../ethereum/web3'
import factory from '../../ethereum/factory'
import Layout from '../../components/Layout'

class CampaignNew extends Component {
  state = { minimumContribution: '' }
  
  onClick = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({ from: accounts[0] }) // no need to specify gas when using metamask (it does it for us)
  }
  
  render () {
    return (
      <Layout>
        <h2>Create a campaign</h2>
        <Form onSubmit={this.onClick}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
            />
          </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
