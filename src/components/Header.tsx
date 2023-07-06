import {
  Box,
  chakra,
  Flex,
  shouldForwardProp,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ColorModeToggle, Link, MobileMenu, SolidityLogo } from '@/components'
import { NAV_LINKS, NAV_HEIGHT, MAIN_CONTENT_ID } from '@/constants'
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
const ENDING_LOGO_HEIGHT = 40
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

  const opacity = useTransform(
    scrollY,
    [STARTING_NAV_HEIGHT - 50, STARTING_NAV_HEIGHT],
    [0, 0.95]
  )

  const desktopY = useTransform(scrollY, [0, Y_OFFSET], [Y_OFFSET, 0])
  const desktopScale = useTransform(
    scrollY,
    [NAV_PADDING, FINAL_SCROLL_DISTANCE],
    [1.1, 0.25]
  )
  const mobileY = useTransform(scrollY, [0, 1], [0, 0])
  const mobileScale = useTransform(scrollY, [0, 1], [0.25, 0.25])
  const y = useBreakpointValue({ base: mobileY, md: desktopY })
  const scale = useBreakpointValue({ base: mobileScale, md: desktopScale })
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
          <Link href="/" aria-label="Go home" display="block">
            <SolidityLogo />
          </Link>
        </MotionDiv>
        {/* Skip To Content link */}
        <Box
          as="a"
          href={`#${MAIN_CONTENT_ID}`}
          pointerEvents="none"
          m="auto"
          opacity={0}
          transition="opacity 200ms ease-in-out"
          fontSize="sm"
          px={1}
          py={0.5}
          _focus={{
            opacity: 1,
            transition: 'opacity 200ms ease-in-out',
          }}
          whiteSpace="nowrap"
          display={{ base: 'none', md: 'block' }}
        >
          {`{ `}skip to content{` }`}
        </Box>
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
              background={pathname.includes(href) ? 'mode' : 'none'}
              boxSizing="content-box"
              borderBottom="1px"
              borderColor="transparent"
              _hover={{
                color: 'text',
                borderColor: 'text',
              }}
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
