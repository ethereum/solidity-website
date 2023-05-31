import { Flex, FlexProps } from '@chakra-ui/react'

export const Section: React.FC<FlexProps> = ({ ...props }) => (
  <Flex as="section" direction="column" {...props} />
)
