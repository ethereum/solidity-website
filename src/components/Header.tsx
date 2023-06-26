import { chakra, Flex, shouldForwardProp } from '@chakra-ui/react'
import { ColorModeToggle, Link, MobileMenu, SolidityLogo } from '@/components'
import { NAV_LINKS, NAV_HEIGHT } from '@/constants'
import {
  motion,
  useScroll,
  useTransform,
  isValidMotionProp,
} from 'framer-motion'
import { useRouter } from 'next/router'

const NAV_PADDING = 2 * 16
const Y_OFFSET = 64
const STARTING_LOGO_HEIGHT = 176
const ASPECT_RATIO = 113 / STARTING_LOGO_HEIGHT
const ENDING_LOGO_HEIGHT = 40
const ENDING_LOGO_WIDTH = ENDING_LOGO_HEIGHT * ASPECT_RATIO
const STARTING_NAV_HEIGHT = STARTING_LOGO_HEIGHT + NAV_PADDING + Y_OFFSET
const FINAL_SCROLL_DISTANCE =
  STARTING_LOGO_HEIGHT - ENDING_LOGO_HEIGHT + Y_OFFSET

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})

export const Header: React.FC = () => {
  const { pathname } = useRouter()
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, Y_OFFSET], [Y_OFFSET, 0])
  const scale = useTransform(
    scrollY,
    [NAV_PADDING, FINAL_SCROLL_DISTANCE],
    [1.1, 0.25]
  )
  const opacity = useTransform(
    scrollY,
    [STARTING_NAV_HEIGHT - 50, STARTING_NAV_HEIGHT],
    [0, 0.95]
  )

  return (
    <>
      <MotionDiv
        position="fixed"
        top={0}
        insetInline={0}
        h={`${NAV_HEIGHT}px`}
        bg="bg"
        zIndex={1}
        transition="background 200ms linear !important"
        boxShadow="md"
        style={{ opacity }}
      />

      <Flex
        position="sticky"
        zIndex="sticky"
        justifyContent="end"
        top={0}
        px={{ base: 4, md: 8 }}
        py={4}
        bg="transparent"
        backdropFilter="blur(3px)"
      >
        {/* Soidity Logo: Positioned absolutely */}
        <MotionDiv
          display="flex"
          position="absolute"
          top={4}
          insetStart={{ base: 4, md: 8 }}
          alignItems="end"
          style={{ scale, y }}
          transformOrigin="top left"
        >
          <Link
            href="/"
            aria-label="Go home"
            display="block"
            w={`${ENDING_LOGO_WIDTH}px`}
          >
            <SolidityLogo />
          </Link>
        </MotionDiv>
        {/* Nav bar / mobile menu with color mode toggle */}
        <Flex
          as="nav"
          display={['none', null, 'flex']}
          h="fit-content"
          alignItems="center"
        >
          {NAV_LINKS.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              px={2}
              py={1}
              fontFamily="mono"
              letterSpacing="-0.02em"
              textDecoration="none"
              background={pathname === href ? 'mode' : 'none'}
            >
              {name}
            </Link>
          ))}
          <ColorModeToggle />
        </Flex>
        {/* Toggle light/dark */}
        <MobileMenu display={['flex', null, 'none']} />
      </Flex>
    </>
  )
}
