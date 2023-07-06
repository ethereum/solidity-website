import { Flex, type FlexProps, Text } from '@chakra-ui/react'
import { RssFeedLinkIcon } from '@/components'
import type { Category } from '@/interfaces'

interface BlogHeroChildProps extends FlexProps {
  category?: Category
}

export const BlogHeroChild: React.FC<BlogHeroChildProps> = ({
  children,
  category,
  ...flexProps
}) => (
  <Flex
    direction={{ base: 'column', sm: 'row' }}
    alignItems="center"
    h={{ base: 'unset', sm: '1.5rem' }}
    overflowY={{ base: 'unset', sm: 'hidden' }}
    {...flexProps}
  >
    <Text
      pe={4}
      borderColor="text"
      borderInlineEnd={{ base: '0px', sm: '2px' }}
      mb={{ base: 4, sm: 0 }}
    >
      {children}
    </Text>
    <RssFeedLinkIcon category={category} />
  </Flex>
)
