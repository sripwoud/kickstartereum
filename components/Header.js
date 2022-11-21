import React from 'react'
import { Divider, Menu, Segment } from 'semantic-ui-react'

import { Link } from '../routes' // doesn't add HTML anchor tag, just wraps children with a click event handler

export default () => {
  return (
    <>
      <Menu style={{ marginTop: '10px' }}>
        <Link legacyBehavior route='/'>
          <a className='item'>Kickstartereum</a>
        </Link>
        <Menu.Menu position='right'>
          <Link legacyBehavior route='/'>
            <a className='item'>Campaigns</a>
          </Link>
          <Link legacyBehavior route='/campaigns/new'>
            <a className='item'>+</a>
          </Link>
        </Menu.Menu>
      </Menu>
      <Divider horizontal>
        <Segment basic textAlign='center'>
          <a href='https://metamask.io/' target='_blank'>
            🦊 Metamask 🦊
          </a>
          <br />
          is required to use this app
          <br />
          <a
            href='https://rinkeby.etherscan.io/address/0x1eb0ef281158ebccacf097e02111f3ab9e0743cc'
            target='_blank'
          >
            (Goerli network)
          </a>
        </Segment>
      </Divider>
    </>
  )
}
