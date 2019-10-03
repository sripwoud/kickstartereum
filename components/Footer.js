import React from 'react'
import { Segment, Divider, Icon } from 'semantic-ui-react'

export default () => {
  return (
    <Divider horizontal>
      <Segment basic textAlign='center'>
        <p>
      Developed on
          <a href='https://www.ethereum.org'>
            <Icon name='ethereum' />
          </a>
      with {' '}
          <Icon name='like' color='red' padding='10px' />
      by
          <a href='https://github.com/6ry0u'>
            @6ry0u
          </a>
        </p>
        <p>
          <a href='https://github.com/6ry0u/airCrowd'>
            <Icon name='github' size='large' color='black' />
          </a>
        </p>
      </Segment>
    </Divider>
  )
}
