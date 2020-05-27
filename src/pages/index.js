/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { PageLayout } from '../page-layout'

export default function IndexPage() {
  const query = useStaticQuery(graphql`
    query GetPosts {
      allMdx(
        filter: { fileAbsolutePath: { glob: "**/posts/**" } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }
  `)
  return (
    <PageLayout>
      {query.allMdx.nodes.map(({ id, fields, frontmatter }) => {
        return (
          <div key={id} className='py-1'>
            <Link to={fields.slug}>{frontmatter.title}</Link>
            <date className='ml-4 text-sm text-gray-500'>
              {frontmatter.date}
            </date>
          </div>
        )
      })}
    </PageLayout>
  )
}
