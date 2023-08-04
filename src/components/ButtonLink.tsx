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
    fontSize: 'md',
    _groupHover: { bg: 'primary' },
  }
  const borderWidth = '2px'
  const outline = {
    color: 'text',
    bg: 'transparent',
    border: borderWidth,
    my: `-${borderWidth}`,
    borderColor: 'border',
    fontSize: 'md',
    _groupHover: {
      bg: 'mode',
      color: 'primary',
      textDecoration: 'none',
      borderColor: 'primary',
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
