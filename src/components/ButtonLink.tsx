import { Box } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@/components'

interface ButtonLinkProps extends LinkProps {
  fullWidthBelowBreakpoint?: string
  variant?: 'solid' | 'outline'
}
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  fullWidthBelowBreakpoint = 'sm',
  variant = 'solid',
  children,
  ...props
}) => {
  const solid = {
    color: 'bg',
    bg: 'text',
    _groupHover: { bg: 'header' },
  }
  const outline = {
    color: 'text',
    bg: 'transparent',
    border: '2px',
    borderColor: 'border',
    _groupHover: {
      bg: 'mode',
      color: 'header',
      textDecoration: 'none',
      borderColor: 'header',
    },
  }
  return (
    <Link
      hideArrow
      boxSizing="border-box"
      data-group
      textDecoration="none !important"
      fontWeight="bold"
      w={{
        base: 'full',
        [fullWidthBelowBreakpoint]: 'fit-content',
      }}
      {...props}
    >
      <Box
        {...(variant === 'outline' ? outline : solid)}
        borderRadius="none"
        px={6}
        py={2}
        textAlign="center"
        alignItems="center"
        // display="block"
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
