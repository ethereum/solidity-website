import { BlogPostPreview, ButtonLink, Section } from '@/components'
import type { BlogProps } from '@/interfaces'
import { BLOG_PATH, BLOG_PAGE_PATH } from '@/constants'
import { Flex, Grid, Icon, Spacer, Text } from '@chakra-ui/react'
import { MdPlayArrow } from 'react-icons/md'

export const BlogPostListSection: React.FC<BlogProps> = ({
  allPostsData,
  page,
  totalPages,
}) => (
  <Section
    direction="column"
    gap={8}
    maxW="container.xl"
    pt={28}
    pb={64}
    fontSize="md"
    mx="auto"
  >
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={16}>
      {allPostsData.map(({ frontmatter, content, url }, i) => (
        <BlogPostPreview
          key={url}
          frontmatter={frontmatter}
          content={content}
          url={url}
          gridColumn={{
            base: 'span 1',
            md: page === 1 && i === 0 ? 'span 2' : 'span 1',
          }}
          maxW="container.md"
        />
      ))}
    </Grid>
    <Flex justify="center" gap={8}>
      {page > 1 ? (
        <ButtonLink
          href={page === 2 ? BLOG_PATH : `${BLOG_PAGE_PATH}/${page - 1}`}
          variant="outline"
        >
          <Flex flexWrap="nowrap" me="auto" alignItems="center">
            <Icon
              as={MdPlayArrow}
              transform="rotate(180deg)"
              size={16}
              marginEnd={2}
            />
            <Text as="span" fontFamily="heading" textTransform="uppercase">
              Newer posts
            </Text>
          </Flex>
        </ButtonLink>
      ) : (
        <Spacer display={{ base: 'none', sm: 'block' }} />
      )}
      {page < totalPages ? (
        <ButtonLink href={`${BLOG_PAGE_PATH}/${page + 1}`} variant="outline">
          <Flex flexWrap="nowrap" ms="auto" alignItems="center">
            <Text as="span" fontFamily="heading" textTransform="uppercase">
              Older posts
            </Text>
            <Icon as={MdPlayArrow} size={16} marginStart={2} />
          </Flex>
        </ButtonLink>
      ) : (
        <Spacer />
      )}
    </Flex>
  </Section>
)
