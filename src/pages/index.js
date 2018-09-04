import React from 'react'
import Layout from '../components/layout'
import { Heading, Flex, Link } from 'rebass'
import styled from 'styled-components'

let FullHeightCenter = styled(Flex).attrs({
  alignItems: 'center',
})`
  height: 100vh;
`

let ColoredLink = styled(Link).attrs({ p: [0, 1] })`
  background-color: ${props => props.bgColor};
  color: white;
  text-decoration: none;
`

export default function IndexPage() {
  return (
    <Layout>
      <FullHeightCenter>
        <Heading fontSize={6}>
          <span role="img" aria-label="Hand waving">
            👋
          </span>{' '}
          i'm mackie. you may have seen me on{' '}
          <ColoredLink bgColor="#1da1f2" href="https://twitter.com/macklinu">
            twitter
          </ColoredLink>{' '}
          or{' '}
          <ColoredLink bgColor="black" href="https://github.com/macklinu">
            github
          </ColoredLink>
          .
        </Heading>
      </FullHeightCenter>
    </Layout>
  )
}
