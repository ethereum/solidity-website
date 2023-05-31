import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <ChakraButton
    color="white"
    bg="primary"
    borderRadius="none"
    px={7}
    py={3}
    _hover={{
      bg: 'gray.700',
    }}
    {...props}
  />
)
