import { Section } from '@/components'
import { Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'

export interface SectionProps extends Pick<FlexProps, 'children'> {}
export const ShowcaseSection: React.FC<SectionProps> = ({ children }) => (
  <Section direction="row" py={16} gap={6}>
    {children}
  </Section>
)

export interface ShowcaseContentProps
  extends Pick<FlexProps, 'children' | 'title'> {}
export const ShowcaseContent: React.FC<ShowcaseContentProps> = ({
  title,
  children,
}) => (
  <Flex flex={2} direction="column">
    <Text as="h2" textStyle="h2">
      {title}
    </Text>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </Flex>
)

export interface ShowcaseVisualProps extends Pick<FlexProps, 'children'> {}
export const ShowcaseVisual: React.FC<ShowcaseVisualProps> = ({ children }) => (
  <Flex flex={1}>{children}</Flex>
)
