import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'

export const Footer: React.FC = () => (
  <Flex
    as="footer"
    direction="column"
    alignItems="center"
    pb={24}
    pt={12}
    px={10}
    gap={10}
  >
    <Flex direction="column" alignItems="center" gap={1}>
      <Text fontFamily="mono" fontSize="lg" /* mb={-6} */ color="header" fontWeight="bold">
        Get involved
      </Text>
      <Flex gap={4} flexWrap="wrap" justify="center" >
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
    </Flex>
    <Divider />
    <Flex direction="column" alignItems="center" gap={1}>
      <Text fontFamily="mono" fontSize="lg" color="header" fontWeight="bold">
        Discover more
      </Text>
      <Flex gap={0} flexWrap="wrap" justify="center">
        {NAV_LINKS.map(({ name, href }) => (
          <Link key={name} href={href} textDecoration="none" py={1} px={2}>
            {name}
          </Link>
        ))}
      </Flex>
    </Flex>
    <Text fontSize="md" textAlign="center">
      2022 Solidity Team •{' '}
      <Link href="https://github.com/ethereum/solidity/blob/develop/CODE_OF_CONDUCT.md">
        Code of Conduct
      </Link>
    </Text>
  </Flex>
)
