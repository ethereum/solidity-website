import { chakra, Flex, shouldForwardProp, useColorMode } from '@chakra-ui/react'
import { ColorModeToggle, Link, MobileMenu, SolidityLogo } from '@/components'
import { NAV_LINKS, NAV_HEIGHT } from '@/constants'
import {
  motion,
  useScroll,
  useTransform,
  isValidMotionProp,
} from 'framer-motion'

export const Header: React.FC = () => {
  const { scrollY } = useScroll()
  const motionStyles = {
    backdrop: {
      opacity: useTransform(scrollY, [250, 300], [0, 0.95]),
    },
    logo: {
      mt: useTransform(scrollY, [0, 64], [50, 0]),
      h: useTransform(scrollY, [64, 200], [175, 40]),
    },
  }
  const STARTING_NAV_HEIGHT = 272 as const // Including logo
  const MotionDiv = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  })
  return (
    <Flex
      px={8}
      py={4}
      justify="space-between"
      position="sticky"
      top={0}
      zIndex="sticky"
      h={STARTING_NAV_HEIGHT}
    >
      <MotionDiv
        position="fixed"
        inset={0}
        bg="bg"
        zIndex={-1}
        transition="background 200ms linear !important"
        backdropFilter="blur(3px)"
        h={`min(${NAV_HEIGHT}, 100%)`}
        boxShadow="md"
        style={{ opacity: motionStyles.backdrop.opacity }}
      />
      <MotionDiv
        style={{
          height: motionStyles.logo.h,
          marginTop: motionStyles.logo.mt,
        }}
      >
        <Link
          href="/"
          aria-label="Go home"
          display="block"
          h="100%"
          w="fit-content"
        >
          <SolidityLogo height="100%" width="fit-content" color="text" />
        </Link>
      </MotionDiv>
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
      <MobileMenu display={['block', null, 'none']} />
    </Flex>
  )
}
