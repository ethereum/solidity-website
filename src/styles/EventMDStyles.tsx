import { Heading } from '@chakra-ui/react'
import { MDStyles } from '@/styles'

export const EventMDStyles = {
  ...MDStyles,
  h2: ({ children, id }: any) => (
    <Heading
      as="h2"
      id={id}
      textStyle="h2"
      color="text"
      mt={{ base: 12, md: 16 }}
      mb={{ base: 4, md: 6 }}
      textAlign="center"
    >
      {children}
    </Heading>
  ),
}
