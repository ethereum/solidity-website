import { Link as ChakraLink } from "@chakra-ui/react"
import type { LinkProps } from "@chakra-ui/react"
import NextLink from "next/link"

export const Link: React.FC<LinkProps> = ({ href, ...props }) => {
  if (!href) throw new Error("Link component requires href prop")
  // Internal links should use Next.js Link component
  const isExternal = href?.startsWith("http")
  if (isExternal) return (
    <ChakraLink
      href={href}
      isExternal
      _after={{
        content: '"↗"',
        ms: 1,
        whiteSpace: 'nowrap'
      }}
      {...props}
    />
  )
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink {...props} />
    </NextLink>
  )
}