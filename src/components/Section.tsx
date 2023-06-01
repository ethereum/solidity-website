import { Flex, FlexProps } from '@chakra-ui/react'

export const Section: React.FC<FlexProps> = (props) => (
  <Flex as="section" direction="column" px={[8, 12, 16, 20]} {...props} />
)
