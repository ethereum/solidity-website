import { chakra, Flex, shouldForwardProp } from '@chakra-ui/react'
import { ColorModeToggle, Link, MobileMenu, SolidityLogo } from '@/components'
import { NAV_LINKS, NAV_HEIGHT } from '@/constants'
import {
  motion,
  useScroll,
  useTransform,
  isValidMotionProp,
} from 'framer-motion'

export const Header: React.FC = () => {
  const { scrollY } = useScroll({ offset: ['end end', 'start end'] })
  const MotionDiv = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  })

  const NAV_PADDING = 2 * 16
  const Y_OFFSET = 64
  const STARTING_LOGO_HEIGHT = 176
  const ENDING_LOGO_HEIGHT = 40
  const ASPECT_RATIO = 113 / 176
  const STARTING_NAV_HEIGHT = STARTING_LOGO_HEIGHT + NAV_PADDING + Y_OFFSET
  const FINAL_SCROLL_DISTANCE =
    STARTING_LOGO_HEIGHT - ENDING_LOGO_HEIGHT + Y_OFFSET
  const C = 0.35 // Adjustment coefficient

  const opacity = useTransform(scrollY, [80, 100], [0, 0.95])
  const height = useTransform(
    scrollY,
    [0, C * FINAL_SCROLL_DISTANCE],
    [STARTING_NAV_HEIGHT, ENDING_LOGO_HEIGHT + NAV_PADDING]
  )
  const width = useTransform(
    scrollY,
    [C * Y_OFFSET, C * (STARTING_LOGO_HEIGHT - ENDING_LOGO_HEIGHT + Y_OFFSET)],
    [STARTING_LOGO_HEIGHT * ASPECT_RATIO, ENDING_LOGO_HEIGHT * ASPECT_RATIO]
  )
  return (
    <MotionDiv
      display="flex"
      position="sticky"
      zIndex="sticky"
      justifyContent="space-between"
      top={0}
      px={8}
      py={4}
      style={{ height }}
      bg="transparent"
      backdropFilter="blur(3px)"
    >
      <MotionDiv
        position="fixed"
        inset={0}
        bg="bg"
        zIndex={-1}
        transition="background 200ms linear !important"
        h={NAV_HEIGHT}
        boxShadow="md"
        style={{ opacity }}
      />
      {/* Soidity Logo: Link w/ SVG */}
      <MotionDiv style={{ width }} display="flex" alignItems="end">
        <Link href="/" aria-label="Go home" display="block">
          <SolidityLogo h="100%" w="100%" />
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
          >
            {name}
          </Link>
        ))}
        <ColorModeToggle />
      </Flex>
      {/* Toggle light/dark */}
      <MobileMenu display={['flex', null, 'none']} />
    </MotionDiv>
  )
}
