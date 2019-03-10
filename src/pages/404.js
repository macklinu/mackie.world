import React from 'react'

import Nav from '../components/Nav'
import Layout from '../components/layout'

const Section = ({ children }) => (
  <section className='mw7-ns center ph3 pv2'>{children}</section>
)

const SectionHeading = ({ children }) => (
  <h2 className='f2 black'>{children}</h2>
)

const NotFoundPage = () => (
  <Layout>
    <Nav />
    <Section>
      <SectionHeading>😅 idk where that page is, sorry</SectionHeading>
    </Section>
  </Layout>
)

export default NotFoundPage
