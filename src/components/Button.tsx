import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'

export const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <ChakraButton
    color="white"
    bg="primary"
    borderRadius="none"
    px={7}
    py={3}
    _hover={{
      bg: 'gray.800',
    }}
    {...props}
  />
)
