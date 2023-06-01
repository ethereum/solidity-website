import { Flex, Image } from '@chakra-ui/react'
import { Link, MobileMenu } from '@/components'
import { NAV_LINKS } from '@/constants'

export const Header: React.FC = () => (
  <Flex as="header" px={8} py={4} alignItems="center" justify="space-between">
    <Link href="/" aria-label="Go home">
      <Image src="/assets/solidity-logo.svg" alt="Solidity logo" h="50px" />
    </Link>
    <Flex as="nav" display={['none', null, 'block']}>
      {NAV_LINKS.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          mx={2}
          fontFamily="mono"
          letterSpacing="-0.02em"
        >
          {name}
        </Link>
      ))}
    </Flex>
    <MobileMenu display={['block', null, 'none']} />
  </Flex>
)
