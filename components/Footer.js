import React from 'react'
import { Segment, Divider, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <Divider horizontal>
      <Segment basic textAlign='center'>
        <p>
      Developed on
          <a href='https://www.ethereum.org' target='_blank'>
            <Icon name='ethereum' />
          </a>
      with {' '}
          <Icon name='like' color='red' padding='10px' />
      by {' '}
          <a href='https://sripwoud.xyz' target='_blank'>
            sripwoud
          </a>
        </p>
        <p>
          <a href='https://github.com/sripwoud/kickstartereum' target='_blank'>
            <Icon name='github' size='large' color='black' />
          </a>
        </p>
      </Segment>
    </Divider>
  )
}
