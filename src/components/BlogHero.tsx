import { Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { CategoryPill, Section } from '@/components'
import type { BlogPostFrontmatter, NavLink } from '@/interfaces'
import { getBlogSubtitle } from '@/utils'

interface BlogHeroProps extends FlexProps {
  frontmatter: BlogPostFrontmatter
  cta?: NavLink[]
}
export const BlogHero: React.FC<BlogHeroProps> = ({
  frontmatter,
  cta,
  ...sectionProps
}) => {
  const { title, author, date, category } = frontmatter
  return (
    <Section
      pt={{ base: 28, md: 56 }}
      pb={{ base: 20, lg: 24 }}
      px={0}
      {...sectionProps}
    >
      <Text as="h1" textStyle="h2-mono" color="text" mb={1}>
        {title}
      </Text>
      <Text color="primary" mb={6}>
        {getBlogSubtitle(author, date)}
      </Text>
      <CategoryPill category={category} mb={0} />
    </Section>
  )
}
