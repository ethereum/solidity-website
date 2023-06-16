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
    color: "bg",
    bg: "text",
    _groupHover: { bg: 'b' },
  }
  const outline = {
    color: 'text',
    bg: "transparent",
    _groupHover: { bg: 'b', color: 'bg' },
  }
  return (
    <Link
      hideArrow
      boxSizing="border-box"
      data-group
      textDecoration="none"
      w={{
        base: 'full',
        [fullWidthBelowBreakpoint]: 'fit-content',
      }}
      {...props}
    >
      <Box
        {...variant === 'outline' ? outline : solid}
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
