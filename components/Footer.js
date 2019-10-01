import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'
import Emoji from 'a11y-react-emoji'

export default () => {
  return (
    <Divider horizontal>
      <Segment basic textAlign='center'>
        <p>
      Developed on
          <a href='https://www.ethereum.org'>
            <Emoji symbol=' 💎 ' label='gem ethereum' />
          </a>
      with
          <Emoji symbol=' 💕 ' label='love' />
      by
          <a href='https://github.com/6ry0u'>
            {' '}@6ry0u
          </a>
        </p>
        <p>
          <a href='https://github.com/6ry0u/airCrowd'>
            <img
              src='../static/GitHub-Mark-32px.png'
              alt='GitHub'
              width='20'
              height='20'
            />
          </a>
        </p>
      </Segment>
    </Divider>
  )
}
