import { SOCIAL_LINKS } from '@/constants'
import { Box, Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { Link } from '@/components'

export const SocialLinks: React.FC<FlexProps> = (props) => (
  <Flex gap={4} flexWrap="wrap" justify="center" {...props}>
    {SOCIAL_LINKS.map(({ name, href, Icon }) => (
      <Link href={href} key={name} hideArrow textDecoration="none" px={2}>
        <Flex alignItems="center" gap={2}>
          <Box borderRadius="base" background="bg" py={2}>
            <Icon size={18} />
          </Box>
          <Text textTransform="lowercase">{name}</Text>
        </Flex>
      </Link>
    ))}
  </Flex>
)
