import { Link as ChakraLink } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { BLOG_URL, DOCS_URL } from '@/constants'
interface LinkComponentProps extends LinkProps {
  hideArrow?: boolean
}
export const Link: React.FC<LinkComponentProps> = ({
  href,
  hideArrow,
  ...props
}) => {
  if (!href) throw new Error('Link component requires href prop')
  const linkStyes = {
    textDecoration: 'underline',
    w: 'fit-content',
  }
  const isExternal =
    href?.startsWith('http') &&
    !href?.startsWith(BLOG_URL) &&
    !href?.startsWith(DOCS_URL)
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
        {...linkStyes}
        {...props}
      />
    )
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink {...linkStyes} {...props} />
    </NextLink>
  )
}
