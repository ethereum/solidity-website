import { Flex, Image } from '@chakra-ui/react'
import { Link } from '@/components'
import { NAV_LINKS } from '../../constants'

export const Header: React.FC = () => (
  <Flex px={8} py={4} alignItems="center">
    <Link href="/" aria-label="Go home">
      <Image src="/assets/solidity-logo.svg" alt="Solidity logo" h="50px" />
    </Link>
    <Flex ms="auto">
      {NAV_LINKS.map(({ name, href }) => (
        <Link key={name} href={href} mx={2}>
          {name}
        </Link>
      ))}
    </Flex>
  </Flex>
)
