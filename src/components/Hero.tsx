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
    pt={{ base: 28, md: 56 }}
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
        content: '"_"',
        display: 'inline-block',
        width: 0,
        overflowX: 'visible',
        color: 'primary',
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
      <Flex
        direction={['column', 'row']}
        gap={5}
        justify="center"
        alignItems="center"
        w={{ base: 'full', sm: 'fit-content' }}
      >
        {cta.map(({ name, href }) => (
          <ButtonLink href={href} key={name}>
            {name}
          </ButtonLink>
        ))}
        {stargazersCount !== undefined && (
          <ButtonLink
            href={GITHUB_URL}
            variant="outline"
            sx={{
              '&>div': { p: 0, display: 'flex' },
              '&>*': { textDecoration: 'none' },
            }}
          >
            <Flex
              borderEnd={stargazersCount !== 0 ? '1px' : '0px'}
              borderColor="border"
              alignItems="center"
              justify="center"
              w="full"
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
        )}
      </Flex>
    )}
  </Section>
)
