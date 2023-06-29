import { Spacer, Flex, Text } from '@chakra-ui/react'
import { Link, SocialLinks } from '@/components'
import { NAV_LINKS } from '@/constants'

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
      <Text fontFamily="mono" fontSize="xl" color="secondary" fontWeight="bold">
        Get involved
      </Text>
      <SocialLinks />
    </Flex>
    <Spacer />
    <Flex direction="column" alignItems="center" gap={1}>
      <Text fontFamily="mono" fontSize="xl" color="secondary" fontWeight="bold">
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
