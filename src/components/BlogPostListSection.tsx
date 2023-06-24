import { BlogPostPreview, ButtonLink, Section } from '@/components'
import type { BlogProps } from '@/interfaces'
import { BLOG_PATH, BLOG_PAGE_PATH } from '@/constants'
import { Flex, Grid, Icon, Spacer, Text } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export const BlogPostListSection: React.FC<BlogProps> = ({
  allPostsData,
  page,
  totalPages,
}) => (
  <Section
    direction="column"
    gap={8}
    maxW="container.lg"
    pt={28}
    pb={64}
    fontSize="md"
    mx="auto"
  >
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr'}}>
      {allPostsData.map(({ frontmatter, content, url }, i) => (
        <BlogPostPreview
          gridColumn={page === 1 && i === 0 ? "span 2" : "span 1"}
          key={url}
          frontmatter={frontmatter}
          content={content}
          url={url}
          
        />
      ))}
    </Grid>
    <Flex justify="space-between" gap={3}>
      {page > 1 ? (
        <ButtonLink
          href={page === 2 ? BLOG_PATH : `${BLOG_PAGE_PATH}/${page - 1}`}
        >
          <Icon
            verticalAlign="middle"
            as={FaArrowLeft}
            size={16}
            _groupHover={{ color: 'primary' }}
          />

          <Text
            as="span"
            marginStart={3}
            fontFamily="heading"
            textTransform="uppercase"
          >
            Newer posts
          </Text>
        </ButtonLink>
      ) : (
        <Spacer />
      )}
      {page < totalPages ? (
        <ButtonLink href={`${BLOG_PAGE_PATH}/${page + 1}`}>
          <Icon
            verticalAlign="middle"
            as={FaArrowRight}
            size={16}
            _groupHover={{ color: 'primary' }}
          />

          <Text
            as="span"
            marginStart={3}
            fontFamily="heading"
            textTransform="uppercase"
          >
            Older posts
          </Text>
        </ButtonLink>
      ) : (
        <Spacer />
      )}
    </Flex>
  </Section>
)
