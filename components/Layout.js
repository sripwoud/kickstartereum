import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

export default props => {
  return (
    <Container>
      <Head>
        <meta property='og:title' content='Kickstartereum' />
        <meta
          property='og:image'
          content='https://6ry0u.surge.sh/portfolio/kickstartereum.png'
        />
        <meta property='og:description' content='Kickstarter on Ethereum' />
        <meta
          property='og:url'
          content='https://kickstartereum.herokuapp.com/'
        />
        <meta
          name='keywords'
          content='Ethereum , Solidity, Smart Contract, Dapp, Kickstarter'
        />
        <meta name='author' content='r1oga' />
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
        />
        <title>Kickstartereum</title>
      </Head>
      <Header />
      {props.children}
      <Footer />
    </Container>
  )
}
