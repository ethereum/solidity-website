import { Flex, FlexProps } from '@chakra-ui/react'

export const Section: React.FC<FlexProps> = (props) => (
  <Flex as="section" direction="column" px={{ base: 4, md: 8 }} {...props} />
)
