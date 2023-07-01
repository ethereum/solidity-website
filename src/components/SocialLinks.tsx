import { SOCIAL_LINKS } from '@/constants'
import { Box, Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { Link } from '@/components'

export const SocialLinks: React.FC<FlexProps> = (props) => (
  <Flex
    direction={{ base: 'column', md: 'row' }}
    columnGap={8}
    flexWrap="wrap"
    justify="center"
    {...props}
  >
    {SOCIAL_LINKS.map(({ name, href, Icon }) => (
      <Link href={href} key={name} hideArrow textDecoration="none">
        <Flex alignItems="center" gap={2}>
          <Box borderRadius="base" py={2}>
            <Icon size={18} />
          </Box>
          <Text fontSize="lg">{name}</Text>
        </Flex>
      </Link>
    ))}
  </Flex>
)
