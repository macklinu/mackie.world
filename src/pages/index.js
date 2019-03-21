import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import CenteredSection from '../components/CenteredSection'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Nav from '../components/Nav'
import PageHeading from '../components/PageHeading'
import SectionHeading from '../components/SectionHeading'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { date: { ne: null } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMM D, Y")
              tags
            }
          }
        }
      }
      allProjectsYaml {
        edges {
          node {
            id
            name
            url
          }
        }
      }
      allOssYaml {
        edges {
          node {
            id
            name
            url
            type
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Nav />
      <Intro />
      <Writings
        posts={data.allMarkdownRemark.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.frontmatter.title,
          date: edge.node.frontmatter.date,
          slug: edge.node.fields.slug,
        }))}
      />
      <Projects
        projects={data.allProjectsYaml.edges.map(edge => ({
          id: edge.node.id,
          url: edge.node.url,
          name: edge.node.name,
        }))}
      />
      <OSS projects={data.allOssYaml.edges.map(edge => edge.node)} />
    </Layout>
  )
}

const OSS = ({ projects }) => {
  const classesForType = type => {
    switch (type) {
      case 'maintainer':
        return 'bg-green white'
      case 'contributor':
        return 'bg-light-gray black'
      default:
        return 'bg-blue white'
    }
  }
  return (
    <CenteredSection>
      <SectionHeading>Open Source 🤖</SectionHeading>
      <div className='flex flex-column'>
        {projects
          .sort((a, b) => {
            if (a.type === 'maintainer' && b.type === 'maintainer') {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            }
            return a.type === 'maintainer' ? -1 : 1
          })
          .map(({ id, name, type, url }) => (
            <Link
              key={id}
              to={url}
              className='link br2 black bg-animate hover-bg-moon-gray pa3 bb b--black-10 br2 f4 flex flex-row justify-between'
            >
              <span className='ml2'>{name}</span>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > *:not(:last-child)': { marginRight: 4 },
                }}
              >
                <Label className={`${classesForType(type)} dib-ns dn`}>
                  {type}
                </Label>
                <FaExternalLinkAlt className='pv1 ph2 br2' />
              </div>
            </Link>
          ))}
      </div>
    </CenteredSection>
  )
}

const Intro = () => (
  <CenteredSection>
    <PageHeading>Hi, my name is Mackie.</PageHeading>
    <p className='f4 lh-copy'>
      I am a <b>software engineer</b>, <b>musician</b>, and <b>artist</b>. I
      love contributing to open-source and working on JavaScript projects. I
      also love guitar 🎸, piano 🎹, cookies 🍪, and video games 🎮.
    </p>
  </CenteredSection>
)

const Writings = ({ posts }) => (
  <CenteredSection>
    <SectionHeading>Writings 📝</SectionHeading>
    <div className='flex flex-column'>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  </CenteredSection>
)

const Projects = ({ projects }) => (
  <CenteredSection>
    <SectionHeading>Projects 👷‍♂️</SectionHeading>
    <div className='flex flex-column'>
      {projects.map(project => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  </CenteredSection>
)

const Project = ({ url, name }) => (
  <Link
    to={url}
    className='link br2 black bg-animate hover-bg-moon-gray pa3 bb b--black-10 br2 f4 flex flex-row justify-between'
  >
    <span className='ml2'>{name}</span>
    <FaExternalLinkAlt className='pv1 ph2 br2' />
  </Link>
)

const Post = ({ slug, title }) => (
  <Link
    to={slug}
    className='link br2 black bg-animate hover-bg-moon-gray pa3 bb b--black-10 br2 f4 flex flex-row justify-between'
  >
    <span className='ml2'>{title}</span>
  </Link>
)

const Label = ({ className, children }) => (
  <span className={['pv1 ph2 br2 f6', className].filter(Boolean).join(' ')}>
    {children}
  </span>
)

export default IndexPage
