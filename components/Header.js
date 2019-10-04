import React from 'react'
import { Menu } from 'semantic-ui-react'

import { Link } from '../routes' // doesn't add HTML anchor tag, just wraps children with a click event handler

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route='/'>
        <a className='item'>
          Kickstartereum
        </a>
      </Link>
      <Menu.Menu position='right'>
        <Link route='/'>
          <a className='item'>
            Campaigns
          </a>
        </Link>
        <Link route='/campaigns/new'>
          <a className='item'>
            +
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}
