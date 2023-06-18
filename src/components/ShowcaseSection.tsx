import { Section } from '@/components'
import { Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'

export interface SectionProps extends Pick<FlexProps, 'children'> {
  startWithVisual?: boolean
}
export const ShowcaseSection: React.FC<SectionProps> = ({
  children,
  startWithVisual,
}) => (
  <Section
    direction={{
      base: 'column-reverse',
      md: startWithVisual ? 'row-reverse' : 'row',
    }}
    py={16}
    gap={12}
  >
    {children}
  </Section>
)

export interface ShowcaseContentProps
  extends FlexProps,
    Pick<FlexProps, 'children' | 'title'> {}
export const ShowcaseContent: React.FC<ShowcaseContentProps> = ({
  title,
  children,
  ...props
}) => (
  <Flex flex={3} direction="column" {...props}>
    <Text as="h2" textStyle="h2">
      {title}
    </Text>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </Flex>
)

export interface ShowcaseVisualProps
  extends FlexProps,
    Pick<FlexProps, 'children'> {}
export const ShowcaseVisual: React.FC<ShowcaseVisualProps> = ({
  children,
  ...props
}) => (
  <Flex flex={2} {...props}>
    {children}
  </Flex>
)
