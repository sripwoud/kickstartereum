import react, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import { Link } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestsIndex extends Component {
  static getInitialProps (props) {
    const { address } = props.query
    return { address }
  }
  render () {
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
      </Layout>
    )
  }
}

export default RequestsIndex
