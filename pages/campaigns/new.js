import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'

import web3 from '../../ethereum/web3'
import factory from '../../ethereum/factory'
import Layout from '../../components/Layout'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }
  
  onClick = async (event) => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    const accounts = await web3.eth.getAccounts()
    try {
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({ from: accounts[0] }) // no need to specify gas when using metamask (it does it for us)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
    this.setState({ loading: false })
  }
  
  render () {
    return (
      <Layout>
        <h2>Create a campaign</h2>
        <Form
          error={!!this.state.errorMessage}
          onSubmit={this.onClick}
        >
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
            />
          </Form.Field>
          <Message
            error 
            header='Ooops'
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
