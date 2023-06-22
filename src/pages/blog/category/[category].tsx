import fs from 'fs'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
// import { PostsPerCategory } from '../../components/UI'
// import { getAllPostsData } from '..'
import { CategoryPath, BlogPostProps } from '@/interfaces'
// import { generateRssFeed, getCategoryFromURL, hidePostFromTheFuture } from '@/utils/'
import { BlogPostPreview, Hero, PageMetadata, Section } from '@/components'
import { BLOG_DIR, CATEGORY_URLS, URL_CATEGORIES_MAP } from '@/constants'
import { getAllPostsData } from '@/utils'

// generate the paths for each category
export const getStaticPaths: GetStaticPaths = () => {
  // check if any .md post file exists, don't generate the paths otherwise
  if (!fs.existsSync(BLOG_DIR)) {
    return {
      paths: [],
      fallback: false,
    }
  }

  // generate a path for each one
  const paths: CategoryPath[] = []
  const categories: string[] = [
    'releases',
    'security-alerts',
    'announcements',
    'explainers',
  ]
  categories.forEach((category) => {
    paths.push({ params: { category } })
  })
  Object.values(CATEGORY_URLS).forEach((value) => {})

  // return list of paths
  return {
    paths,
    fallback: false,
  }
}

// generate the static props for the page
export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params as ParsedUrlQuery
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_DIR)
  console.log({categoryParam: category})
  const sortedFiles = files.sort().reverse()
  const allPostsData = getAllPostsData(sortedFiles, fs)
  const categoryPostsData = allPostsData.filter(
    ({ frontmatter })  => 
      frontmatter.category === URL_CATEGORIES_MAP[category as keyof typeof URL_CATEGORIES_MAP]
  )
  // const feed = await generateRssFeed(
  //   allPostsData,
  //   locale!,
  //   category as keyof typeof URL_CATEGORIES_MAP
  // )
  // const directory = `./public/${locale}/${category}/`
  // fs.mkdirSync(directory, { recursive: true })
  // fs.writeFileSync(`${directory}/feed.xml`, feed.rss2())

  return {
    props: {
      categoryPostsData,
      category,
    },
  }
}

interface Props {
  categoryPostsData: BlogPostProps[]
  category: keyof typeof URL_CATEGORIES_MAP
}

const CategoryPage: NextPage<Props> = ({ categoryPostsData, category }) => {
  return (
    <>
      <PageMetadata
        title={`Blog: ${category}`}
        description="Solidity Lang blog: latest news & announcements"
      />
      <main>
        <Hero header="Blog">All {category} posts</Hero>
        <Section
          direction="column"
          gap={8}
          maxW="container.lg"
          pt={28}
          pb={64}
          fontSize="md"
          mx="auto"
        >
          {categoryPostsData.map(({ frontmatter, content, url }) => (
            <BlogPostPreview
              key={url}
              frontmatter={frontmatter}
              content={content}
              url={url}
            />
          ))}
        </Section>
      </main>
    </>
  )
}

export default CategoryPage
