import {
  Link as ChakraLink,
  type LinkProps,
  useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { DOCS_URL } from '@/constants'
interface LinkComponentProps extends LinkProps {
  hideArrow?: boolean
}
export const Link: React.FC<LinkComponentProps> = ({
  href,
  hideArrow,
  ...props
}) => {
  if (!href) throw new Error('Link component requires href prop')
  const { colorMode } = useColorMode()
  const linkStyes = {
    textDecoration: 'underline',
    w: 'fit-content',
    _hover: {
      color: 'primary',
    },
  }
  const isDoc = href.startsWith(DOCS_URL)
  const isExternal = href.startsWith('http') && !isDoc

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

  let path: string = href
  if (isDoc) {
    const url = new URL(href)
    const params = new URLSearchParams(url.search)
    params.set('color', colorMode)
    url.search = params.toString()
    path = url.toString()
  }

  return (
    <NextLink href={path} passHref legacyBehavior>
      <ChakraLink {...linkStyes} {...props} />
    </NextLink>
  )
}
