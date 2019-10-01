import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'

import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router} from '../routes'

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ loading: true, errorMessage: '' })
    
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(`${this.state.value}`, 'ether')
      })
      
      // refresh page
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
    this.setState({ loading: false, value: '' })
  }

  render () {
    return (
      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label='ether'
            labelPosition='right'
            value={this.state.value}
            onChange={(event) => this.setState({value: event.target.value})}
          />
        </Form.Field>
        <Message error header='Oops' content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>Contribute!</Button>
      </Form>
    )
  }
}

export default ContributeForm
