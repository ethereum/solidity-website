import { Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { ButtonLink, Section } from '@/components'
import type { NavLink } from '@/types'

interface HeroProps extends FlexProps {
  header: string
  cta?: NavLink[]
}
export const Hero: React.FC<HeroProps> = ({
  header,
  children,
  cta,
  ...props
}) => (
  <Section
    py={[10, null, null, 12]}
    gap={8}
    alignItems="center"
    textAlign="center"
    {...props}
  >
    <Text
      as="h1"
      textStyle="h1"
      position="relative"
      textTransform="lowercase"
      w="fit-content"
      _after={{
        content: '""',
        position: 'absolute',
        left: '100%',
        bottom: 0,
        transform: 'translateY(-100%)',
        width: 'min(3.75rem, 7.5vw)',
        height: 'min(0.5rem, 1vw)',
        bg: 'primary',
        sx: {
          '@keyframes blink-cursor': {
            'from, to': { opacity: 0 },
            '50%': { opacity: 1 },
          },
        },
        animation: 'blink-cursor 1.25s step-end infinite',
      }}
    >
      {`{${header.replaceAll(' ', '_')}}`}
    </Text>
    <Text maxW="container.md" fontSize={['xl', null, '2xl']}>
      {children}
    </Text>
    {cta?.length && (
      <Flex direction={['column', 'row']} gap={5} justify="start">
        {cta.map(({ name, href }) => (
          <ButtonLink href={href} key={name} w={['100%', 'fit-content']}>
            {name}
          </ButtonLink>
        ))}
      </Flex>
    )}
  </Section>
)
