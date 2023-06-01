import { Box } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@/components'

export const ButtonLink: React.FC<LinkProps> = ({ children, ...props }) => (
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
      w="fit-content"
    >
      {children}
    </Box>
  </Link>
)
