import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants'

export const Footer: React.FC = () => (
  <Flex
    as="footer"
    direction="column"
    alignItems="center"
    bg="gray.800"
    pb={24}
    pt={12}
    px={10}
    gap={12}
    color="white"
  >
    <Text fontFamily="mono" fontSize="2xl" mb={-6}>
      Get involved
    </Text>
    <Flex gap={8}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <Link href={href} key={name} hideArrow>
          <Flex direction="column" alignItems="center" gap={2}>
            <Box borderRadius="base" bg="bg" color="fg" px={5} py={2}>
              <Icon size={24} />
            </Box>
            <Text textTransform="lowercase">{name}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
    <Divider />
    <Flex>
      {NAV_LINKS.map(({ name, href }) => (
        <Link key={name} href={href} mx={2}>
          {name}
        </Link>
      ))}
    </Flex>
    <Text fontSize="md" textAlign="center">
      2022 Solidity Team •{' '}
      <Link href="https://github.com/ethereum/solidity/blob/develop/CODE_OF_CONDUCT.md">
        Code of Conduct
      </Link>
    </Text>
  </Flex>
)
