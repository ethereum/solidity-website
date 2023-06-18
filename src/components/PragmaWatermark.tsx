import { Flex, Text } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

const labels = [
  'pragma',
  'contract',
  'function',
  'modifier',
  'event',
  'struct',
  'enum',
  'require',
  'address',
]

export const PragmaWatermark: React.FC<BoxProps> = (props) => (
  <Flex
    as="aside"
    direction="column"
    display={{ base: 'none', md: 'flex' }}
    alignItems="end"
    position="absolute"
    maxW="container.xl"
    mx="auto"
    inset={0}
    px={8}
    py={16}
    gap={2}
    zIndex={-1}
    {...props}
  >
    {labels.map((label) => (
      <Text
        key={label}
        fontFamily="mono"
        fontSize={{ base: '4xl', lg: '5xl' }}
        opacity="5%"
        display="block"
        textAlign="end"
        lineHeight="125%"
      >
        {label}
      </Text>
    ))}
  </Flex>
)
