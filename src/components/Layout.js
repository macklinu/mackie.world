import 'tachyons'

import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { createGlobalStyle } from 'styled-components'

import mackie from '../images/mackie-face.png'

const Reset = createGlobalStyle`
* { box-sizing: border-box; }
`

const googleMeta = ({ title, description, image }) => [
  { itemprop: 'name', content: title },
  { itemprop: 'description', content: description },
  { itemprop: 'image', content: image },
]

const twitterMeta = ({ title, description, image }) => [
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:site', content: '@macklinu' },
  { name: 'twitter:image', content: image },
  { name: 'twitter:image:alt', content: "mackie's face" },
]

const openGraphMeta = ({ title, description, image }) => [
  { name: 'og:title', content: title },
  { name: 'og:description', content: description },
  { name: 'og:image', content: image },
  { name: 'og:image:alt', content: "mackie's face" },
  { name: 'og:site_name', content: title },
  { name: 'og:locale', content: 'en_US' },
  { name: 'og:type', content: 'website' },
]

const Layout = ({ children, meta = {} }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const title = meta.title
    ? `${meta.title} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title
  const description = meta.description || data.site.siteMetadata.description
  return (
    <>
      <Helmet
        title={title}
        meta={[
          { charSet: 'utf-8' },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
          { name: 'description', content: description },
          { name: 'image', content: mackie },
          ...openGraphMeta({ title, description, image: mackie }),
          ...googleMeta({ title, description, image: mackie }),
          ...twitterMeta({ title, description, image: mackie }),
        ]}
      >
        <html lang='en' />
        <Reset />
        <body className='sans-serif bg-white black' />
      </Helmet>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout