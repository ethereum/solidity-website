import { Box, Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { IoStarSharp } from 'react-icons/io5'
import { ButtonLink, Section } from '@/components'
import { GITHUB_URL } from '@/constants'
import type { NavLink } from '@/interfaces'
import { formatBigNumber } from '@/utils'

interface HeroProps extends FlexProps {
  header: string
  cta?: NavLink[]
  stargazersCount?: number
}
export const Hero: React.FC<HeroProps> = ({
  header,
  children,
  cta,
  stargazersCount,
  ...props
}) => (
  <Section
    pt={56}
    pb={[10, null, null, 12]}
    gap={8}
    alignItems="center"
    textAlign="center"
    position="relative"
    {...props}
  >
    <Text
      as="h1"
      textStyle="h1"
      position="relative"
      textTransform="lowercase"
      w="fit-content"
      whiteSpace="normal"
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
    <Box maxW="container.md" fontSize="2xl">
      {children}
    </Box>
    {cta?.length && (
      <Flex direction={['column', 'row']} gap={5} justify="start">
        {cta.map(({ name, href }) => (
          <ButtonLink href={href} key={name} w={['100%', 'fit-content']}>
            {name}
          </ButtonLink>
        ))}
        <ButtonLink
          href={GITHUB_URL}
          variant="outline"
          sx={{
            '&>div': { p: 0, display: 'flex' },
            '&>*': { textDecoration: 'none' },
          }}
        >
          <Flex
            borderEnd={stargazersCount !==  0 ? "1px" : 0}
            borderColor="border"
            alignItems="center"
            gap={2}
            px={3}
            py={1.5}
          >
            <FaGithub />
            Repository
          </Flex>
          {stargazersCount !== 0 && stargazersCount && (
            <Flex alignItems="center" gap={2} px={3}>
              <IoStarSharp />
              {formatBigNumber(stargazersCount)}
            </Flex>
          )}
        </ButtonLink>
      </Flex>
    )}
  </Section>
)
