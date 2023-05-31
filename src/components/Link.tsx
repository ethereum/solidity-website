import { Link as ChakraLink } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

interface LinkComponentProps extends LinkProps {
  hideArrow?: boolean
}
export const Link: React.FC<LinkComponentProps> = ({
  href,
  hideArrow,
  ...props
}) => {
  if (!href) throw new Error('Link component requires href prop')
  const isExternal =
    href?.startsWith('http') && !href?.includes('soliditylang.org')
  if (isExternal)
    return (
      <ChakraLink
        href={href}
        isExternal
        _after={
          hideArrow
            ? {}
            : {
                content: '"↗"',
                ms: 1,
                whiteSpace: 'nowrap',
              }
        }
        {...props}
      />
    )
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink {...props} />
    </NextLink>
  )
}
