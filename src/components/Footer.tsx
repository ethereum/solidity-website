import { Spacer, Flex, Text } from '@chakra-ui/react'
import { Link, SocialLinks } from '@/components'
import { NAV_LINKS } from '@/constants'

export const Footer: React.FC = () => (
  <Flex
    as="footer"
    direction="column"
    alignItems={{ base: 'start', md: 'center' }}
    pb={24}
    pt={12}
    px={{ base: 4, md: 8 }}
    gap={10}
  >
    <Flex
      direction="column"
      alignItems={{ base: 'start', md: 'center' }}
      gap={1}
    >
      <Text fontFamily="mono" fontSize="md" color="secondary" fontWeight="bold">
        Get involved
      </Text>
      <SocialLinks />
    </Flex>
    <Spacer />
    <Flex
      direction="column"
      alignItems={{ base: 'start', md: 'center' }}
      gap={1}
    >
      <Text fontFamily="mono" fontSize="md" color="secondary" fontWeight="bold">
        Discover more
      </Text>
      <Flex
        flexWrap="wrap"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
      >
        {NAV_LINKS.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            textDecoration="none"
            py={1}
            px={{ base: 0, md: 2 }}
          >
            {name}
          </Link>
        ))}
      </Flex>
    </Flex>
    <Flex fontSize="lg" textAlign="center" flexWrap="wrap" columnGap={4}>
      <Text>2023 Solidity Team</Text>
      <Text>•</Text>
      <Link
        href="https://github.com/ethereum/solidity/blob/develop/SECURITY.md"
        color="primary"
      >
        Security Policy
      </Link>
      <Text>•</Text>
      <Link
        href="https://github.com/ethereum/solidity/blob/develop/CODE_OF_CONDUCT.md"
        color="primary"
      >
        Code of Conduct
      </Link>
    </Flex>
  </Flex>
)
