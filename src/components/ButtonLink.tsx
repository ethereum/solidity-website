import { Box } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@/components'

interface ButtonLinkProps extends LinkProps {
  fullWidthBelowBreakpoint?: string
}
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  fullWidthBelowBreakpoint = 'sm',
  children,
  ...props
}) => {
  return (
    <Link
      hideArrow
      boxSizing="border-box"
      data-group
      textDecoration="none"
      {...props}
    >
      <Box
        color="white"
        bg="primary"
        _groupHover={{
          bg: 'gray.800',
        }}
        borderRadius="none"
        px={6}
        py={2}
        textAlign="center"
        w={{
          base: 'full',
          [fullWidthBelowBreakpoint]: 'fit-content',
        }}
      >
        {children}
      </Box>
    </Link>
  )
}
