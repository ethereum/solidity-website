import { Section } from '@/components'
import { Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'

export interface SectionProps extends FlexProps {
  startWithVisual?: boolean
  reverseMobile?: boolean
}
export const ShowcaseSection: React.FC<SectionProps> = ({
  children,
  startWithVisual,
  reverseMobile,
  ...props
}) => (
  <Section
    direction={{
      base: reverseMobile ? 'column' : 'column-reverse',
      md: startWithVisual ? 'row-reverse' : 'row',
    }}
    alignItems="centeR"
    p={0}
    gap={12}
    {...props}
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
  <Flex
    flex={3}
    direction="column"
    sx={{
      '& > p:not(:last-of-type)': { mb: 4 },
    }}
    {...props}
  >
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
