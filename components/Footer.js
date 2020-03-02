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
          <a href='https://github.com/r1oga'>
            @r1oga
          </a>
        </p>
        <p>
          <a href='https://github.com/r1oga/kickstartereum'>
            <Icon name='github' size='large' color='black' />
          </a>
        </p>
      </Segment>
    </Divider>
  )
}
