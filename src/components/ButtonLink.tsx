import { Flex } from '@chakra-ui/react'
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
    _groupHover: { bg: 'primary' },
  }
  const outline = {
    color: 'text',
    bg: 'transparent',
    border: '2px',
    borderColor: 'border',
    _groupHover: { bg: 'primary', color: 'bg', textDecoration: 'none' },
  }
  return (
    <Link
      hideArrow
      boxSizing="border-box"
      data-group
      textDecoration="none !important"
      w={{
        base: 'full',
        [fullWidthBelowBreakpoint]: 'fit-content',
      }}
      {...props}
    >
      <Flex
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
      </Flex>
    </Link>
  )
}
